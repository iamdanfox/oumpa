/*
 * OUMPA Maillist Subscribe
 * ========================
 *
 * The maillist signup form was designed to work the SYMPA program that managed
 * the OUMPA mailing list in 2014.  Since there is no web API, it registers
 * the email address user@example.com to the list by sending an email from that address to:
 *
 *   oumpa-subscribe@maillist.ox.ac.uk
 *
 * The sending script runs on the node.js platform, on a free dyno provided
 * by Heroku <http://maillist-subscribe.herokuapp.com>.  You'll need the correct
 * remote set up (git@heroku.com:maillist-subscribe.git).  To update it, push the
 * `maillist-signup` branch to Heroku master to update:
 *
 *   git push heroku maillist-signup:master
 *
 * To be added as a collaborator on Heroku, [email me][1].
 *
 * [1]: mailto:iamdanfox@gmail.com
 */

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
  // send email to oumpa-subscribe@maillist.ox.ac.uk, impersonating the new signup

  var email = req.query.email;
  console.log(email);
  if (email) {
    var mail = {
      from: email,
      to: "oumpa-subscribe@maillist.ox.ac.uk",
      cc: 'webmaster@oxfordpentathlon.org',
      subject: "[OUMPA mailing list notification] "+email+" just signed up for the OUMPA mailing list",
      text: email + " just signed up for the OUMPA mailing list on oxfordpentathlon.org. \n\n" +
        "You shouldn't need to do anything, but if this email looks like a tab, you can kick them off at " +
        "http://web.maillist.ox.ac.uk/"
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
