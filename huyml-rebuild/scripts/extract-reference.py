"""Extract editable content and original media references from captured public pages.
Run with a Python environment containing beautifulsoup4 and requests.
"""
from pathlib import Path
from bs4 import BeautifulSoup
import re,json,urllib.parse,concurrent.futures,requests
ROOT=Path(__file__).resolve().parents[1]
def soup(name):return BeautifulSoup((ROOT/'reference'/f'{name}.html').read_text(),'html.parser')
def records(s):
 a=json.loads(s.find('script',id='__framer__handoverData').text)
 def d(i,depth=0):
  if i<0 or depth>25:return None
  v=a[i]
  if isinstance(v,dict):return {k:d(x,depth+1) for k,x in v.items()}
  if isinstance(v,list):return [d(x,depth+1) if isinstance(x,int) else x for x in v]
  return v
 return [d(i) for i,v in enumerate(a) if isinstance(v,dict) and len(v)>2]
def val(x):return x.get('value') if isinstance(x,dict) else None
assets={}
def local(url):
 if not url:return ''
 name=urllib.parse.urlparse(url).path.split('/')[-1]
 assets[name]=url
 return '/assets/'+name
s=soup('home'); projects=[]
for a in s.select('a[href^="./project/"]'):
 slug=a['href'].split('/')[-1]
 if any(p['slug']==slug for p in projects):continue
 def field(name):
  e=a.find(attrs={'data-framer-name':name});return e.get_text('\n',strip=True) if e else ''
 p={k:field(v) for k,v in {'title':'Title','date':'Date','recognition':'Recognition','role':'Author','roleLabel':'Ruler','category':'Category','description':'Description'}.items()}
 p['slug']=slug;p['cover']=local(a.find('img')['src']);p['colors']=[]
 for i in range(1,4):
  c=a.find(attrs={'data-framer-name':f'Color{i}'})
  p['colors'].append(re.search(r'(rgba?\([^)]*\)|#[0-9a-fA-F]{3,8})',c.get('style','')).group(0) if c else '#181818')
 detail=soup(slug)
 p['about']=detail.find(attrs={'data-framer-name':'Description'}).get_text('\n',strip=True)
 visit=next((a.get('href') for a in detail.find_all('a') if 'Visit site' in a.get_text()),'')
 p['website']=visit
 r=next(x for x in records(detail) if 'H6tzPXi4l' in x)
 p['next']=val(r.get('previousItemId.vLVe3KnmR'))
 p['media']=[]
 for k,v in r.items():
  if isinstance(v,dict) and v.get('type')=='responsiveimage':
   im=val(v);p['media'].append({'type':'image','src':local(im['src']),'width':im.get('pixelWidth',1600),'height':im.get('pixelHeight',1000)})
  elif isinstance(v,dict) and v.get('type')=='link' and 'vimeo.com' in str(val(v)):
   p['media'].append({'type':'video','src':val(v),'width':1600,'height':900})
 projects.append(p)
projects.reverse()
for i,p in enumerate(projects):
 if not p["next"]:p["next"]=projects[(i+1)%len(projects)]["slug"]
rs=records(soup('playground'));titles={val(r['id']):val(r['R31SQI9dL']) for r in rs if 'R31SQI9dL' in r};play=[]
for r in rs:
 if 'SmWxeUCQ0' not in r:continue
 item={'id':val(r['id']),'title':titles.get(val(r['id']),''),'slug':val(r['LX8FYIrAg'])}
 if r['SmWxeUCQ0']:
  im=val(r['SmWxeUCQ0']);item.update(type='image',src=local(im['src']),width=im.get('pixelWidth',1600),height=im.get('pixelHeight',1000))
 else:item.update(type='video',src=val(r['dkFfLsq5G']),width=1600,height=900)
 play.append(item)
posters_path=ROOT/'reference/video-posters.json'
if posters_path.exists():
 posters=json.loads(posters_path.read_text())
 for item in play:
  if item['src'] in posters and 'poster' in posters[item['src']]:item.update(posters[item['src']])
aboutcode=next((ROOT/'reference').glob('g_J*.mjs')).read_text()
hobbies=[]
for key in ['bida','cat','cay','game','laptop','mi','rean','sotd','time']:
 def get(prop):
  m=re.findall(r'\b'+key+prop+r': `([^`]+)`',aboutcode);return m[-1].replace('\\u2028','\n') if m else ''
 hobbies.append({'id':key,'title':get('Title'),'description':get('Description'),'image':local(get('Media'))})
for url in re.findall(r'https://framerusercontent.com/assets/[^`"\s<>]+',aboutcode):
 if any(ext in url for ext in ['.riv','.mp3','.jpg','.png']):local(url)
for url in ['https://framerusercontent.com/assets/'+x for x in ['pczyWZYmicHp9LhGgMJo7tnDcHo.woff2','oDqinH2S9k4fMbGueYwREUmNFM.woff2','NjDO01jId5REkpwNN1pD7i8fBLY.woff2','xirQ3g4Sv5q7MG0KvL1PiOOLLBA.woff2','7wvwHnWrXSgYhuk2mEt4LrDGXo.woff2','dcnL9H2gaFNAG9F1nc6gCkZt2CQ.woff2','R4RlD3IldAw8k5cRONJ8SJJgqG4.svg','Bi57PSNgEGNhXnUjCjYBKAacRQ.svg','EwHniTuZoV3ME15lpjBiKTAYilc.svg','JZyDNnSPROUpFuFHbWYIKApoHng.svg','NwRpkuqMO8dekRRBn6RJjQlpM.mp3','hxSMzW8WhffneAE4dlHetxMRI.mp3']]:local(url)
for name,data in [('projects',projects),('playground',play),('hobbies',hobbies)]: (ROOT/'src/data'/f'{name}.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
(ROOT/'reference/asset-manifest.json').write_text(json.dumps(assets,indent=2))
# Keep the original authored shader as an attributed visual reference, with an editable standalone scene.
code=next((ROOT/'reference').glob('e8*.mjs')).read_text()
for name in ['vertexShader','fragmentShader']:
 m=re.search(r'\('+name+r' = `([\s\S]*?)`\)',code)
 (ROOT/'src/shaders'/('gallery.'+('vert' if name=='vertexShader' else 'frag'))).write_text('// Adapted from the publicly delivered HUYML gallery shader. Original visual author: huyml.co.\n'+m.group(1))
# Images and fonts are stored locally; Vimeo videos retain the original embed delivery.
def download(item):
 name,url=item;dest=ROOT/'public/assets'/name
 if dest.exists():return None
 try:
  if '/images/' in url:
   u=urllib.parse.urlparse(url);q=urllib.parse.parse_qs(u.query);q['scale-down-to']=['1600'];url=urllib.parse.urlunparse(u._replace(query=urllib.parse.urlencode(q,doseq=True)))
  r=requests.get(url,timeout=45);r.raise_for_status();dest.write_bytes(r.content)
 except Exception as e:return name,str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
 failures=[r for r in pool.map(download,assets.items()) if r]
print(json.dumps({'projects':len(projects),'playground':len(play),'hobbies':len(hobbies),'assets':len(assets),'failures':failures}))
