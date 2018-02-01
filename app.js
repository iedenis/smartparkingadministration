var app = function () {

  var http = require('http');
  var express = require('express');
  var app = express();
  var cors = require('cors');
  app.use(cors());
  app.options('*',cors);
  //connection to remote mongo database
  var mongodb = require('mongodb').MongoClient;
  var connectionUrl = 'mongodb://admin:admin@ds111258.mlab.com:11258/cars';
  

  mongodb.connect(connectionUrl, function (err, db) {
    if (err) {
      // console.log(err);
      throw err;
    } else {
      var collection = db.collection('drivers');
      collection.find({}).toArray(function (err, result) {
        if (err) throw err;

      });
      db.close;
    }
  })
  
  app.use(express.static(__dirname + '/public'));



  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);

  //routing
  app.get('/', function (req, res) {
    res.render('index.html');
  });

  app.get('/contacts', function (req, res) {
    res.render('contacts.html');
  });
  app.get('/guide', function (req, res) {
    res.render('guide.html');
  });
  app.get('/addnewdriver', function (req, res) {
    res.render('addnewdriver.html');
  });
  return app;
}();

module.exports = app;