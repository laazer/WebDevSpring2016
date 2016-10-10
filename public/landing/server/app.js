module.exports = function(app, mailer) {
    require("./services/email.service.js")(app, mailer);
};
