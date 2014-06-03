// web.js
var express = require("express");
var logfmt = require("logfmt");
var mailer = require("nodemailer");

var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var smtpTransport = mailer.createTransport();

app.post('/maillist-signup', function(req, res){
  // send email to oumpa-subscribe-user=example.com@maillist.ox.ac.uk

  var email = req.query.email
  if (email) {

    var dest = "oumpa-subscribe-"+email.replace("@","=")+"@maillist.ox.ac.uk"


    var mail = {
      from: "Node JS <nodejs@heroku.com>",
      to: "iamdanfox@gmail.com",
      //to: dest,
      subject: "Send Email Using Node.js",
      text: dest,
      // html: "<b>Node.js New world for me</b>"
    }

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
            res.send(error, 500) // internal server error
        }else{
            console.log("Message sent: " + response.message);
            res.send("Success")
        }
        // smtpTransport.close();
    });
  } else {
    res.send("Error: please specify email parameter", 400) // bad request
  }
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
