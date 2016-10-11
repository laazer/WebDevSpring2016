module.exports = function(app, mailer) {
    var resp = require("./resp.js")();


    app.post("/api/landing/email", sendMail);
    //app.get("/api/landing/email", sendMail);


    function sendMail(req, res) {
      var body = req.body;
      mailer({
          from: 'mailer@laazer.com',
          to: 'jabrandt31@gmail.com',
          subject: '[no-reply] Message from ' + body.name,
          html: body.message + '\n From: ' + body.email,
        }, function(err, reply) {
          console.log(err && err.stack);
          console.dir(reply);
      });
    }
}
