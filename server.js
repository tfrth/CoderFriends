var express = require('express');
var session = require('express-session');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

var app = express();
var port = 9999;

app.use(express.static(__dirname+'/public'));

app.use(session({secret: 'simulation_theory'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GithubStrategy({
  clientID: 'ac613b6853e4beea18a9',
  clientSecret: 'c4f385e1808c114243272fc7e97f8e2b259efd31',
  callbackURL: 'http://localhost:9999/auth/github/callback'
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', passport.authenticate('github', {
	successRedirect: '/#/home',
	failureRedirect: '/failure'
}));

passport.serializeUser(function(user, done){
	done(null, user);
})
passport.deserializeUser(function(obj, done){
	done(null, obj);
})

var requireAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  return next();
}

app.get('/api/github/following', function(req, res){
	return res.json(req.user);
})


app.listen(port);
console.log("Listening on port " + port);