module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    devServer: {
        port: 8006,
        proxy: {
            '/api/': {
                target: 'http://172.18.21.212:9000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/': '/'
                }
            }
        }
    },
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js'
        }
    }
};
