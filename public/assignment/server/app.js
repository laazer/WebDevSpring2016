module.exports = function(app, uuid, mongoose, db) {
    require("./services/field.service.server.js")(app, uuid, mongoose, db);
    require("./services/form.service.server.js")(app, uuid, mongoose, db);
    require("./services/user.service.server.js")(app, mongoose, db);
};
