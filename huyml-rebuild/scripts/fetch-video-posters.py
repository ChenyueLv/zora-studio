"""Fetch public Vimeo oEmbed thumbnails. Does not access private video streams."""
import json,re,requests,concurrent.futures
from pathlib import Path
root=Path(__file__).resolve().parents[1]
play=json.loads((root/'src/data/playground.json').read_text())
urls=[p['src'] for p in play if p['type']=='video']+['https://vimeo.com/1217193217']
def fetch(url):
 try:
  ident=re.search(r'\d+',url).group(0)
  r=requests.get('https://vimeo.com/api/oembed.json',params={'url':url,'width':1280},timeout=20);r.raise_for_status();info=r.json()
  image=requests.get(info['thumbnail_url'],timeout=20);image.raise_for_status()
  name=f'vimeo-{ident}.jpg';(root/'public/assets'/name).write_bytes(image.content)
  return url, {'poster':'/assets/'+name,'width':info.get('width',1600),'height':info.get('height',900)}
 except Exception as e:return url,{'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor: results=dict(executor.map(fetch,urls))
for p in play:
 if p['src'] in results and 'poster' in results[p['src']]:p.update(results[p['src']])
(root/'src/data/playground.json').write_text(json.dumps(play,ensure_ascii=False,indent=2))
(root/'reference/video-posters.json').write_text(json.dumps(results,indent=2))
print(json.dumps({'downloaded':sum('poster' in p for p in results.values()),'errors':{k:v for k,v in results.items() if 'error' in v}}))
