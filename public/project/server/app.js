module.exports = function(app, uuid, mongoose, db) {
    require("./services/argument.service.server.js")(app, uuid, mongoose, db);
    require("./services/debate.service.server.js")(app, uuid, mongoose, db);
    require("./services/user.service.server.js")(app, mongoose, db);
};
