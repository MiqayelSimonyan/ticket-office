import passport from 'passport';
import express from 'express';
import mongoose from 'mongoose';

const LocalStrategy = require('passport-local').Strategy;
const router = module.exports = express.Router();
const Admin = mongoose.model('Admin');

passport.use(new LocalStrategy((username, password, done) => {
        Admin.findOne({username: username}, (err, admin) => {
            console.log('err', err);
            console.log('admin', admin);
            if (err) return done(err);
            if (!admin)  return done(null, false, {message: 'Incorrect username'});

            return done(null, admin);
        });
    }
));

router.post('/', (req, res) => {    
    if (!req.isAuthenticated()) return res.send({isAuth: false});
    res.send({isAuth: true, username: req.user.username});
});

router.post('/signup', (req, res, next) => {
    if (!/[a-zA-Z\s]{3,40}/.test(req.body.name))  return res.send({
        status: 'error',
        message: 'Username is incorrect'
    });

    if (!/\S+@\S+\.\S+/.test(req.body.email))  return res.send({
        status: 'error',
        message: 'E-mail address is incorrect'
    });

    if (!/[^\\s]{3,40}/.test(req.body.password))  return res.send({
        status: 'error',
        message: 'Password is incorrect'
    });

	passport.authenticate('local', (err, admin) => {
		if (err) return next(err);
        if (!err) {
            Admin.findOne({ $or: 
                        [
                            {username: req.body.username},
                            {email: req.body.email}
                        ] 
                    })
                    .exec()
                    .then(findAdmin => {
                        if (findAdmin && findAdmin.email === req.body.email)  return next({
                            status: 'error',
                            message: 'E-mail address already registered'
                        });
                        if (findAdmin && findAdmin.username === req.body.username)  return next({
                            status: 'error',
                            message: 'Username already registered'
                        });
                        new Admin({
                            name: req.body.name,
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password
                        }).save((err, admin) => {
                        	if (err) return next(err);
                            req.logIn(admin, err => {
                            	if (err) return next(err);
                                res.send({
                                    success: true,
                                    message: 'Admin Created',
                                    name: req.body.name,
                                    username: req.body.username,
                                    email: req.body.email
                                });
                            });
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
        }
    })(req, res, next);
});

// login
router.post('/signin', (req, res, next) => {
    Admin.findOne({email: req.body.email, username: req.body.username, password: req.body.password}, (err, admin) => {
        if (!admin) {
            return res.send({
                status: 'error',
                message: 'E-mail or username or password incorrect'
            });
        }

        passport.authenticate('local', (err, admin) => {
            if (err) return next(err);
            req.logIn(admin, err => {
                res.send({
                    status: 'success',
                    message: `Welcome ${req.body.username}`,
                    url: req.body.r || '/admin',
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email
                });
            });
        })(req, res, next);
    });
});

// logout
router.get('/signout', (req, res) => {  
    req.logout();
    res.redirect('/');
});