import { defineConfig } from '@vue/cli-service';
import routes from './src/routes';

function loadPages() {
  const outPage = {};
  const appPages = routes;
  const pageEnum = Object.keys(appPages);

  pageEnum.forEach((pEnum) => {
    const pageInfo = appPages[pEnum];
    outPage[pEnum] = {
      entry: pEnum === 'index' ? './src/main.js' : `./src/pages/${pEnum}/main.js`,
      template: pageInfo.template || 'public/templates/default.html',
      title: pageInfo.title || 'BizTreats',
      chunks: ['chunk-vendors', 'chunk-common', pEnum],
    };
  });
  return outPage;
}
const importPages = loadPages();
export default defineConfig({
  transpileDependencies: true,
  pages: importPages,
});
