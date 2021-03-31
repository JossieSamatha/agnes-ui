module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    devServer: {
        port: 8006,
        proxy: {
            '/api/ecm-server': {
                target: 'http://127.0.0.1:7002/api/ecm',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/ecm-server': '/'
                }
            },
            '/api/agnes-ec': {
                target: 'http://127.0.0.1:9001',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/agnes-ec': '/'
                }
            },
            // '/api/agnes-remind': {
            //     target: 'http://127.0.0.1:9004',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api/agnes-remind': '/'
            //     }
            // },
            // '/api/agnes-ac': {
            //     target: 'http://127.0.0.1:9002',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api/agnes-ac': '/'
            //     }
            // },
            // '/api/agnes-app': {
            //     target: 'http://127.0.0.1:9003',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api/agnes-app': '/'
            //     }
            // },
            // '/api/agnes-datav': {
            //     target: 'http://172.18.21.191:7010',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api/agnes-datav': '/'
            //     }
            // },
            // '/api/data-pipe': {
            //     target: 'http://127.0.0.1:9021/api/data-pipe',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api/data-pipe': '/'
            //     }
            // },
            // '/api/dop-bpmn': {
            //     target: 'http://127.0.0.1:9023/api/dop-bpmn',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api/dop-bpmn': '/'
            //     }
            // },
            // '/dop-kpi/': {
            //     target: 'http://172.20.10.3:7002',
            //     ws: true,
            //     changeOrigin: true,
            // },
            '/api/': {
                // target: 'http://172.18.16.195:9000',
                target: 'http://agnes.test.hexinfo.cn:8200/api',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/': '/'
                }
            },
        }
    },
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js'
        }
    }
};
