// web.js
var express = require("express");
var mailer = require("nodemailer");

var app = express();
var smtpTransport = mailer.createTransport();

app.get('/', function(req, res) {
  res.send('Sign up an email address to an Oxford Ezmlm list.\n\nSend a get '+
  'request to /maillist-signup?email=first.last%40coll.ox.ac.uk\n\nUser will '+
  'receive a confirmation email.\n');
});

app.get('/maillist-signup', function(req, res){
  // send email to oumpa-subscribe-user=example.com@maillist.ox.ac.uk

  var email = req.query.email;
  console.log(email);
  if (email) {
    var dest = "oumpa-subscribe-"+email.replace("@","=")+"@maillist.ox.ac.uk";

    var mail = {
      from: "OUMPA <pentathlon.club@studentclubs.ox.ac.uk>", // email for OUMPA SSO
      to: dest,
      cc: 'iamdanfox@gmail.com',
      subject: "Online signup for OUMPA mailing list",
      text: email
    };

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
            res.send(error, 500); // internal server error
        }else{
            console.log("Message sent: " + response.message);
            res.send("Success\n");
        }
        // smtpTransport.close();
    });
  } else {
    res.send("Error: please specify email parameter\n", 400); // bad request
  }
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
