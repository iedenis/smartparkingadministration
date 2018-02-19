var app = function () {
  var cors = require('cors');
  var http = require('http');
  var express = require('express');
  var app = express();
  app.use(cors());
  app.options('*', cors);

  app.use(express.static(__dirname + '/public'));



  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);

  //routing
  app.get('/', (req, res) =>
    res.render('index.html'));

  //not in use
  // app.get('/login',(req,res)=> 
  //   res.render('login.html')
  // )

  app.get('/contacts', (req, res) =>
    res.render('contacts.html'));
  app.get('/guide', (req, res) =>
    res.render('guide.html'));
  app.get('/addnewdriver', (req, res) =>
    res.render('addnewdriver.html'));
  return app;
}();

module.exports = app;