module.exports = function(app, mailer) {
    var resp = require("./resp.js")();


    //app.post("/api/landing/email", sendMail);
    app.get("/api/landing/email", sendMail);


    function sendMail(req, res) {
      mailer({
          from: 'mailer@laazer.com',
          to: 'jabrandt31@gmail.com',
          subject: 'test sendmail',
          html: 'Mail of test sendmail ',
        }, function(err, reply) {
          console.log(err && err.stack);
          console.dir(reply);
      });
    }
}
