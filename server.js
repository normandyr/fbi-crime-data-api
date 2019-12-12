'use strict';

const express = require('express'),
    app = express(),
    request = require('request'),
	crimeManager = require('./modules/crime_module.js'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	passport = require('passport'),
	Twitter = require('twitter'),
	TwitterStrategy = require('passport-twitter').Strategy;
	

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(
	expressSession({
		secret: 'ihadacatnamedcat',
		resave: false,
		saveUninitialized: false
	})
);

app.use(express.static('resources'));

app.use(express.static('static'));

app.use(express.json()); // for parsing application/json
app.use(
	express.urlencoded({
		extended: true
	})
); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// Setup Passport
app.use(passport.initialize());
// Make sure express-session was already configured
app.use(passport.session());
let user =0;
// Configure Login
passport.use(new TwitterStrategy({
	consumerKey: 'qf9HDIK1deHY07Kx8uvNZMgeZ',
	consumerSecret: 'F7AZNnhaiB5nzl7cau8Q0Gmqtux3ky3X99L7kxTjsdN1RVZbt3',
	callbackURL: "http://localhost:8081/auth/twitter/callback"
  },
  function(accessToken, refreshToken, profile, done) {
	//check user table for anyone with a facebook ID of profile.id
	if (profile) {
		user = profile;
		return done(null, user);
		}
		else {
		return done(null, false);
		}
	  
}
));

const client = new Twitter({
consumer_key: 'qf9HDIK1deHY07Kx8uvNZMgeZ',
consumer_secret: 'F7AZNnhaiB5nzl7cau8Q0Gmqtux3ky3X99L7kxTjsdN1RVZbt3',
access_token_key: '1068334877311942656-87gfl7x0UH1utPBlK8xDzjo5zGCBrm',
access_token_secret: 'q32zXeOYO1F9GHWu82N5LAJE8e0pY5QQUsDeNGjGqyVz5'

});

app.get('/login', function(req, res) {
	res.render('login')
});

app.post('/postContent', function(req){
	const content = req.body.content;
	client.post('statuses/update',
	{status: content});
});



passport.serializeUser(function(user, done) {
		done(null, user);
});
	
passport.deserializeUser(function(user, done) {
		done(null, user);
});




app.get('/auth/twitter', passport.authenticate('twitter'));
	
app.get('/auth/twitter/callback',
	passport.authenticate('twitter', { successRedirect: '/',
									   failureRedirect: '/login' }));	

	
app.post('/login',
		passport.authenticate('twitter-token', {
			failureRedirect: '/login',
			successRedirect: '/'
		})
	);
	
const ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated() === false) {
		console.log('I dont think so!');
		res.sendStatus(403);
		return;
		}
	
		next();
	};
	
	app.get('/', ensureAuthenticated, function(req, res) {
		console.log(req.user);
		res.render('main', {
			user: req.user
		});
	});


	app.get('/auth/logout', function(req, res) {
		
		req.logout();
		res.redirect('/');
	});


app.get('/about', function(req, res) {
	res.render('about')
});

app.get('/state', function(req, res) {
	res.render('crime_state')
});

app.post('/result', function(req, res) {
	const statePick = req.body.state_abbr;
	const yearPick = req.body.year;
	console.log("Data received from client side: ");
	console.log(req.body);
	console.log("This is the year selected from client: " + yearPick);
	
	console.log(statePick);
	console.log(statePick + " <=== Selected State here");
	
	
	request(
		{
			method: 'GET',
			url: `https://api.usa.gov/crime/fbi/sapi/api/estimates/states/${statePick}/${yearPick}/${yearPick}?api_key=Tk97yCeNe82Cb54D0tcNKy5Rh5be1Qr05zRKKyNC`,
			json: true
		},
		function(error, response, crimes) {
			const status = response.statusCode;
			console.log(status);
			if (status >= 400) {
				res.status(400);
				res.send(`Invalid State ${statePick}`);
				console.log(`${statePick}`);
				return;
			}
			
			console.log(error);
			console.log("Total records of data returned from API: " + crimes.results.length + " records");
			console.log(typeof yearPick + " <=== check data type of yearPick variable");

			for (let i=0; i < crimes.results.length; i++) {
				if ( yearPick == crimes.results[i].year) {
					console.log("Selected year: " + yearPick);
					var crime_result = crimes.results[i];
					console.log(crime_result);
					console.log("Checked year from API: " + crime_result.year);
				}
			}
			console.log("Not bad");
			res.json(crime_result);
			crimeManager.returnInfo(crime_result);
			console.log("Check module working or not");
			console.log(crime_result);
			console.log(" ^^^^ CRIME GOTCHA!!!! ^^^^");
		}
	);
});

app.get('/serverRequest', function(req, res) {
	const state_abbr =  req.query.crimes;
	console.log(typeof state_abbr);
	request(
		{
			method: 'GET',
			//if this goes down again check api key and make sure the url is correct
			//it had changed from last time 11/18 to 12/19 or I had the incorrect file
			url: `https://api.usa.gov/crime/fbi/sapi/api/estimates/states/${statePick}/${yearPick}/${yearPick}?api_key=Tk97yCeNe82Cb54D0tcNKy5Rh5be1Qr05zRKKyNC`,
			json: true
		},
		function(error, response, crimes) {
			console.log("AAA" + error);
			console.log(response.statusCode);
			console.log(typeof crimes);
			console.log(crimes.results[0]);
			res.send(`You chose State ${state_abbr}`);
		}
	);

});




const server = app.listen(8081, function() {
	console.log(`Server started on port ${server.address().port}`);
});
