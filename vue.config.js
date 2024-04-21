const { defineConfig } = require('@vue/cli-service')

function loadPages() {
  const outPage = {};
  const routes = require('./src/routes');
  const pageEnum = Object.keys(routes);

  pageEnum.forEach((pEnum) => {
    const pageInfo = routes[pEnum];
    const pEnums = pEnum.split('/')
    const lastPage = pEnums[pEnums.length - 1]
    outPage[pEnum] = {
      entry: pEnum === 'index' ? './src/main.js' : `./src/pages/${pEnum}/${lastPage}.js`,
      template: pageInfo.template || 'public/default.html',
      title: pageInfo.title || 'BizTreats',
      chunks: ['chunk-vendors', 'chunk-common', pEnum],
    };
  });
  return outPage;
}
const importPages = loadPages();

module.exports = defineConfig({
  transpileDependencies: true,
  pages: importPages,
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
      })
      return definitions
    })
  }
})

