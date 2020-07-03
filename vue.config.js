module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    devServer: {
        port: 8006,
        proxy: {
            '/api/agnes-ac': {
                target: 'http://127.0.0.1:9002',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/agnes-ac': '/'
                }
            },
            '/api/': {
                target: 'http://172.18.16.195:9000',
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
