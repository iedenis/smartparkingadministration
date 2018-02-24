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
  app.get('/', function (req, res) {
    res.render('index.html');
  })
  //not in use
  // app.get('/login',(req,res)=> 
  //   res.render('login.html')
  // )

  app.get('/contacts', function (req, res) {
    res.render('contacts.html')
  });
  app.get('/guide', function (req, res) {
    res.render('guide.html')
  });
  app.get('/addnewdriver', function (req, res) {
    res.render('addnewdriver.html')
  });
  return app;
}();

module.exports = app;