'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    consolidate = require('consolidate'),
    swig = require('swig'),
    path = require('path'),
    config = require('../config');

module.exports.init = function(){
    var app = express();

        // Body Parser middleware integration
        this.initBodyParser(app);
        this.initViewEngine(app);
        this.initIgnoreStaticRoutes(app);
    return app;
}

module.exports.initBodyParser = function(app){
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    app.use(bodyParser.json())
};

module.exports.initViewEngine = function(app){
    app.engine('server.view.html', consolidate['swig']);

    app.set('view engine', 'server.view.html');
    app.set('views', path.join(process.cwd(),'/modules/core/server/views/'));
}

module.exports.initIgnoreStaticRoutes = function(app){
    app.use('/public', express.static(path.resolve('./public')));

    config.client.files.forEach(function(staticPath){
        app.use(staticPath, express.static(path.resolve('./'+ staticPath)));
    })
}





