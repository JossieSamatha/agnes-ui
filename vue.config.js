module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    devServer: {
        port: 8006,
        proxy: {
            '/api/': {
                target: 'http://localhost:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
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
