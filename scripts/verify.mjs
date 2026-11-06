import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';
import { parse } from 'yaml';
const read = p => readFileSync(p, 'utf8');
const walk = p => readdirSync(p).flatMap(n => statSync(join(p,n)).isDirectory() ? walk(join(p,n)) : [join(p,n)]);
const config = parse(read('.pages.yml'));
for (const entry of config.content) {
 const value = JSON.parse(read(entry.path));
 for (const item of entry.list ? value : [value]) {
  for (const field of entry.fields) {
   assert.ok(field.name in item, `${entry.name}: missing ${field.name}`);
   if(field.required) assert.ok(item[field.name], `Empty ${field.name}`);
   if(field.type === 'select') assert.ok(field.options.values.includes(item[field.name]));
  }
 }
}
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = (process.env.BASE_PATH ?? (repository && repository.toLowerCase() !== 'damien23rd.github.io' ? `/${repository}` : '/')).replace(/\/$/,'');
for (const page of ['', 'about/', 'projects/', 'ongoing/', 'gallery/', 'skills/', 'contact/']) assert.ok(existsSync(`dist/${page}index.html`), `Missing page: ${page}`);
let checked = 0;
for (const file of walk('dist').filter(p => p.endsWith('.html'))) {
 const html = read(file);
 assert.ok(html.includes('id="main"'), `${file}: missing main landmark`);
 assert.ok(!/mailto:|tel:|[\w.+-]+@[\w.-]+\.[a-z]{2,}|\b0[0-9]{9}\b/i.test(html), `${file}: unexpected public contact details`);
 for (const [,path] of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
  if (/^(https?:|data:)/.test(path)) continue;
  const pathname = path.split(/[?#]/)[0];
  assert.ok(pathname.startsWith(`${base}/`), `${file}: path outside base: ${pathname}`);
  let target = resolve('dist', pathname.slice(base.length+1));
  if (pathname.endsWith('/')) target = join(target,'index.html');
  assert.ok(existsSync(target), `${file}: broken local link ${path}`);
  checked++;
 }
}
console.log(`Passed: 7 pages + 404, CMS content fields, privacy scan, ${checked} local links/assets. Base: ${base || '/'}`);
