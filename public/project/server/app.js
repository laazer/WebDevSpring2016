module.exports = function(app, uuid) {
    //require("./services/field.service.server.js")(app, uuid);
    require("./services/debate.service.server.js")(app, uuid);
    require("./services/user.service.server.js")(app);
};
