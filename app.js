import http from 'http';
import express from 'express';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
var MongoStore = require('connect-mongo')(session);
import passport from 'passport';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import register from 'ignore-styles';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext, Redirect } from 'react-router'
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import {Provider} from 'react-redux';
import store from './public/src/store';
import config from './config';
register(['.sass', '.scss']);

var app = express();
app.use(express.static(__dirname + '/public/dist'));
app.use(express.static(__dirname + '/public/src'));
app.set('views', __dirname + '/public/dist');
app.use(favicon(__dirname + '/favicon.ico'));
app.use('/public', express.static(__dirname + '/public'))

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

import Main from './public/src/containers/main.container';
import serverTemplate from './public/src/serverTemplate';
import NavigationComponent from './public/src/components/navigation.component';

const context = {}
app.get('/', (req, res, next) => {
	const html = renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={context}>
		  		<Main />
			</StaticRouter>
		</Provider>
	);

	if (context.url) {
	    res.writeHead(302, {
	      Location: context.url
	    })
    	res.end()
	} else {
		res.send(serverTemplate(html));
		res.end()
	}

	next();
});

mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.connect(config.db, {useMongoClient: true}, (err) => {
	if (err) throw err;
	console.log('mongodb connected');
});

app.use(session({
	secret: 'keyboard cat',
 	resave: true,
	saveUninitialized: true,
  	cookie: { maxAge: 2592000000, secure: false },
  	store: new MongoStore({
		url: config.db
	})
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());

// passport.js stuff
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// models
fs.readdirSync(__dirname + '/models').forEach(file => {
	if (file.match(/\.js$/) !== null) {
		require(__dirname + '/models/' + file);
	}
});

// helpers
global.helpers = {};
fs.readdirSync(__dirname + '/helpers').forEach(function (file) {
    if (file.match(/\.js$/) !== null) {
        var name = file.replace('.js', '');
        global.helpers[name] = require(__dirname + '/helpers/' + file);
    }
});

// controllers
fs.readdirSync(__dirname + '/controllers').forEach(file => {
	if (file.match(/\.js$/) !== null) {
		var name = file.replace('.js', '');
		if (['admin'].indexOf(name) > -1) {
			app.use('/admin', require(__dirname + '/controllers/' + file));
		} else if (['auth'].indexOf(name) > -1) {
			app.use('/auth', require(__dirname + '/controllers/' + file));
		} else {
			app.use('/', require(__dirname + '/controllers/' + file));
		}
	}
});

app.use((err, req, res, next) => {
	res.status(400).send(err);
	next();
});

var server = http.createServer(app);
server.listen(config.port, config.host, function() {
	console.log(`server connected on port ${this.address().port}`);
});