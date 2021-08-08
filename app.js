// var express = require('express');
// var app = express();
// app.set('port', process.env.PORT || 3000);
// app.get('/', function(req, res){ res.type('text/plain'); //route for App Name
//             res.send('App Name');
// });
// app.get('/about', function(req, res){ //route for App Name
//             res.type('text/plain');
//             res.send('About App');
// });

// app.get('/about/contact', function(req, res){ //route for App Name
//   res.type('text/plain');
//   res.send('contact info');
// });

// app.get('/about/directions', function(req, res){ //route for App Name
//   res.type('text/plain');
//   res.send('directions');
// });
//     // custom 404 page
// /*
// instead of using app.get for 404 and 500 we are using app.use
// express uses app.use to add middleware
// middleware is a catch-all handler for anything that didnt get matched
// by a route.
// in express, the ORDER OF ROUTES IS IMPORTANT. If we put the 404 handler above the routes, 
// the home page and About page would stop working: instead, those URLs would result in a 404.
// */
// app.use(function(req, res, next){ res.type('text/plain');//404 handler
//             res.status(404);
//             res.send('404 - Not Found');
// });
//     // custom 500 page
// app.use(function(err, req, res, next){ console.error(err.stack);
//   res.type('text/plain');
//   res.status(500);
//   res.send('500 - Server Error');
// });
// app.listen(app.get('port'), function(){
// console.log( 'Express started on http://localhost:' +
//   app.get('port') + '; press Ctrl-C to terminate.' );
//   });

/*
Views and Laya view is what gets delivered to the user. In the case of a website,
that usually means HTML, though you could also deliver a PNG or a PDF, or anything
that can be rendered by the client. For our purposes, we will consider views to be HTML.

view doesnt have to static - HTML can be constructed on the fly to provide
customized page for each request

--different view engines: Jade, Handlebars
--jade is "too abstract" and handlebars are less abstract


to install handlebars run 'npm install --save express3-handlebars'
*/
var app = express();

var handlebars = require('express3-handlebars').create({defaultLayout : 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


//app.set('port', process.env.PORT || 3000);
app.get('/', function(req, res){  //route for App Name
            res.render('home');
});
app.get('/about', function(req, res){ //route for App Name
            res.render('about');
});

app.get('/about/contact', function(req, res){ //route for App Name
  res.type('text/plain');
  res.send('contact info');
});

app.get('/about/directions', function(req, res){ //route for App Name
  res.type('text/plain');
  res.send('directions');
});