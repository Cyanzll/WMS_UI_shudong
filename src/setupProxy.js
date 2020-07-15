const { createProxyMiddleware } = require('http-proxy-middleware');

//跨域代理
module.exports = function(app) {
    //桂乙侨
    app.use('/gyq', createProxyMiddleware({ 
        target: 'http://47.105.184.154:8988', 
        changeOrigin: true,
        pathRewrite: {'^/gyq':'/'}
    }))
};
