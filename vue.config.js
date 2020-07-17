module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    devServer: {
        port: 8006,
        proxy: {
            '/api/agnes-ec': {
                target: 'http://127.0.0.1:9001',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/agnes-ec': '/'
                }
            },
            '/api/agnes-dop': {
                target: 'http://127.0.0.1:9007',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/agnes-dop': '/'
                }
            },
            '/api/agnes-ac': {
                target: 'http://127.0.0.1:9002',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/agnes-ac': '/'
                }
            },
            '/api/agnes-dop': {
                target: 'http://127.0.0.1:9007',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/agnes-dop': '/'
                }
            },
            '/api/': {
                // target: 'http://172.18.16.195:9000',
                target: 'http://agnes.dev.hexinfo.cn:8200/api',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/': '/'
                }
            },
            '/dop-kpi/': {
                target: 'http://172.18.21.212:9000',
                ws: true,
                changeOrigin: true,
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
