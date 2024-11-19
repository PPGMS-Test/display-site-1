const path = require("path");
const WebpackBar = require("webpackbar");

const url = process.env.REACT_APP_URL
module.exports = {
    // webpack 配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用 @ 表示 src 文件所在路径
            "@": path.resolve(__dirname, "src"),
            // 约定：使用 @scss 表示 样式 文件所在路径
            "@scss": path.resolve(__dirname, "src", "assets", "styles"),
        },
        plugins: [new WebpackBar()],

        // devServer: {
        //     port: 20241,
        //     open: true,
        //     hot: true,
        //     client: {
        //         overlay: false,
        //     },

        //     // 配置代理解决跨域
        //     // 代理适用于类似Fetch的请求, 而不是 script标签的加载
        //     proxy: {
        //         "/": {
        //             target: url,
        //             changeOrigin: true,
        //             pathRewrite: {
        //                 "^/": "",
        //             },
        //         },
        //     },
        //     // 之前没有在craco.config.js中配置devServer, 在启动项中配置的端口, 现在不需要了
        //     // "start": "cross-env port=20241 cross-env REACT_APP_ENV=development craco start",
        // },
    },
};

//carco相关设置
// https://blog.csdn.net/guxin_duyin/article/details/127247755
//https://juejin.cn/post/7283314026343006219
