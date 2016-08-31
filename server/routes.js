Picker.route('/container/:container_name', function(params, req, res, next) {
    let httpProxy = Npm.require('http-proxy');
    let proxy = httpProxy.createProxyServer({ws: true});
    proxy.web(req, res, {
        target:'http://docker-server:8000/container'
    });
});
