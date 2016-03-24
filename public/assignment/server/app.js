module.exports = function(app, uuid) {
    require("./services/field.service.server.js")(app, uuid);
    require("./services/form.service.server.js")(app, uuid);
    require("./services/user.service.server.js")(app);
};
