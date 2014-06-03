// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World!');
});


app.post('/maillist-signup', function(req, res){
  // send email to oumpa-subscribe-user=example.com@maillist.ox.ac.uk
  res.send(req.query.email.replace("@","="))
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
