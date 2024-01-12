const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const resolveSrc = (dir) => path.join(__dirname, "src", dir);
// 常用的目录
const commonDirs = [
  "assets",
  "directive",
  "views",
  "utils",
  "api",
  "styles",
  "lang",
];
// 按需引入ElementPlus组件
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
// 自动导入Icon图标
const IconsResolver = require("unplugin-icons/resolver");
const Icons = require("unplugin-icons/webpack");

const UnoCSS = require("@unocss/webpack").default;
const { resolve } = require("path");

module.exports = defineConfig({
  publicPath: "./",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: true,
  chainWebpack: (config) => {
    // 添加components、assets, utils到resolve.alias
    for (const dir of commonDirs) {
      config.resolve.alias.set(dir, resolveSrc(dir));
    }
    // 内置的svg处理排除指定目录下的文件
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
  },
  // 引入UnoCSS
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
      },
    },
    plugins: [
      UnoCSS({
        hmrTopLevelAwait: false,
      }),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "@vueuse/core"],
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [ElementPlusResolver(), IconsResolver({})],
        vueTemplate: true,
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            // 指定collection，即指定为elementplus图标集ep
            enabledCollections: ["ep"],
          }),
          // 这个是组件自动导入
          ElementPlusResolver(),
        ],
        // 指定自定义组件位置(默认:src/components)
        dirs: ["src/**/components"],
      }),
      // Icons图标自动下载
      Icons({
        autoInstall: true,
      }),
    ],
    optimization: {
      realContentHash: true,
    },
  },
  css: {
    // CSS 预处理器
    loaderOptions: {
      // 定义全局 SCSS 变量
      scss: {
        javascriptEnabled: true,
        data: `@import "~@/styles/variables.scss";`,
      },
    },
  },
  // 代理
  devServer: {
    // 运行是否自动打开浏览器
    open: true,
    client: {
      overlay: false,
    },
    // 代理
    proxy: {
      "/prod-api": {
        target: "http://vapi.youlai.tech",
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
