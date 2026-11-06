import { defineConfig } from 'astro/config';
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = process.env.BASE_PATH ?? (repository && repository.toLowerCase() !== 'damien23rd.github.io' ? `/${repository}` : '/');
export default defineConfig({ site: 'https://Damien23rd.github.io', base, trailingSlash: 'always', output: 'static' });
