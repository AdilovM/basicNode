// 1 Routing

// var http = require('http');
// http.createServer(function(req,res){
// // normalize url by removing querystring, optional
// // trailing slash, and making it lowercase
// var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase(); switch(path) {
// case '':
// res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('Homepage');
// break;
// case '/about':
// res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('About');
// break;
// default:
// res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not Found');
// break;
//         }
// }).listen(3000);
//     console.log('Server started on localhost:3000; press Ctrl-C to terminate....');


// Serving static resources

// var http = require('http'), fs = require('fs');
// function serveStaticFile(res, path, contentType, responseCode) { 
//   if(!responseCode) responseCode = 200; 
//   fs.readFile(__dirname + path, function(err,data) {
//     if(err) {
//       res.writeHead(500, { 'Content-Type': 'text/plain' }); 
//       res.end('500 - Internal Error');
//     } else { 
//       res.writeHead(responseCode,
//         { 'Content-Type': contentType });
//           res.end(data);
//     } 
//   });
// }
// http.createServer(function(req,res){
// // normalize url by removing querystring, optional // trailing slash, and making lowercase
// var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase(); 
// switch(path) {
//   case '':
//     serveStaticFile(res, '/public/home.html', 'text/html'); 
//     break;
//   case '/about':
//     serveStaticFile(res, '/public/about.html', 'text/html'); 
//     break;
//   case '/img/logo.jpg':
//     serveStaticFile(res, '/public/img/logo.jpg','image/jpeg'); 
//     break;
//   default:
//     serveStaticFile(res, '/public/404.html', 'text/html',404); 
//     break;
//   }
// }).listen(3000);
// console.log('Server started on localhost:3000; press Ctrl-C to terminate....');


// Express
// var express = require('express');
// var app = express();
// app.set('port', process.env.PORT || 3000);
//     // custom 404 page
// app.use(function(req, res){ res.type('text/plain');
//             res.status(404);
//             res.send('404 - Not Found');
// });
//     // custom 500 page
// app.use(function(err, req, res, next){ console.error(err.stack);
//             res.type('text/plain');
//             res.status(500);
//             res.send('500 - Server Error');
// });

// app.listen(app.get('port'), function(){
// console.log( 'Express started on http://localhost:' +
//         app.get('port') + '; press Ctrl-C to terminate.' );
//     });


//Adding routes for home page and about page
// var express = require('express');
// var app = express();
// app.set('port', process.env.PORT || 3000);
// app.get('/', function(req, res){ res.type('text/plain');
//   res.send('Meadowlark Travel');
// });
// app.get('/about', function(req, res){
//   res.type('text/plain');
//   res.send('About Meadowlark Travel');
// });
//     // custom 404 page
// app.use(function(req, res, next){ res.type('text/plain');
//   res.status(404);
//   res.send('404 - Not Found');
// });
// app.use(function(err, req, res, next){ console.error(err.stack);
//   res.type('text/plain');
//   res.status(500);
//   res.send('500 - Server Error');
// });
// app.listen(app.get('port'), function(){
// console.log( 'Express started on http://localhost:' +
//         app.get('port') + '; press Ctrl-C to terminate.' );
//     });


//Views and Layouts
var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js')
//  set up handlebars view engine

// var fortunes = [
//   "Conquer your fears or they will conquer you.", "Rivers need springs.",
//   "Do not fear what you don't know.",
//   "You will have a pleasant surprise.", "Whenever possible, keep it simple.",
//   ];

app.set('port', process.env.PORT || 3000);
var handlebars = require('express3-handlebars') .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


//Static Files and Views
app.use(express.static(__dirname + '/public'));

//Declaring routes (home, about, 404, 50)
app.get('/', function(req, res) { 
  res.render('home'); 
});
// app.get('/about', function(req, res) {
//   res.render('about');
// });
//modified the route "about" to get random fortune cookie
app.get('/about', function(req, res){ 
  // var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortune: fortune.getFortune() });
});
    // 404 catch-all handler (middleware)
app.use(function(req, res, next){ res.status(404);
  res.render('404');
});
    // 500 error handler (middleware)
app.use(function(err, req, res, next){ 
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
app.listen(app.get('port'), function(){ console.log( 'Express started on http://localhost:' +
  app.get('port') + '; press Ctrl-C to terminate.' );
});


/* 
Dynamic Content in Views

Let’s say that on the About page, we want to deliver a 
“virtual fortune cookie.” In our meadowlark.js file, we 
define an array of fortune cookies: */

