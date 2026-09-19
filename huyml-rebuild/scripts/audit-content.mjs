import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = name => JSON.parse(fs.readFileSync(new URL(`../src/data/${name}.json`, import.meta.url)));
const projects = read('projects'), experiments = read('playground'), hobbies = read('hobbies');
assert.equal(projects.length, 19); assert.equal(experiments.length, 83); assert.equal(hobbies.length, 9);
assert.equal(new Set(projects.map(p => p.slug)).size, projects.length);
assert.equal(new Set(experiments.map(p => p.id)).size, experiments.length);
let images = 0, videos = 0;
function media(m) {
  if (m.poster) asset(m.poster);
  assert(m.src && m.width > 0 && m.height > 0, `Invalid media: ${m.src}`);
  if (m.type === 'video') { assert.match(m.src, /vimeo\.com\/(?:video\/)?\d+/); videos++; }
  else { asset(m.src); images++; }
}
function asset(src) {
  assert.match(src, /^\/assets\//);
  assert(fs.statSync(new URL('../public' + src, import.meta.url)).size > 0, src);
}
for (const p of projects) {
  assert(p.title && p.about && p.description && p.media.length && p.colors.length === 3, p.slug);
  assert(projects.some(n => n.slug === p.next), `Broken next-project link: ${p.slug}`);
  asset(p.cover); p.media.forEach(media);
}
experiments.forEach(media);
const courseWorks = read('course-works');
assert.equal(new Set([...courseWorks, ...experiments].map(p => p.id)).size, courseWorks.length + experiments.length);
for (const w of courseWorks) {
  assert(w.title && w.width > 0 && w.height > 0, `Invalid course work: ${w.id}`);
  asset(w.src);
  if (w.type === 'video') { assert.match(w.src, /\.mp4$/); asset(w.poster); if (w.previewVideo) asset(w.previewVideo); }
}
for (const h of hobbies) { assert(h.title && h.description.length > 200); asset(h.image); }
const root = new URL('../src/', import.meta.url);
for (const f of fs.readdirSync(root, {recursive:true}).filter(f => /\.(tsx?|css)$/.test(f))) {
  const code = fs.readFileSync(new URL(f, root), 'utf8');
  for (const match of code.matchAll(/\/assets\/([A-Za-z0-9_.-]+)/g)) asset(match[0]);
}
console.log(`PASS: ${projects.length} projects, ${experiments.length} experiments, ${courseWorks.length} course works, ${hobbies.length} actual hobby stories; ${images} image placements, ${videos} Vimeo embeds; all local asset references and next-project links valid.`);
