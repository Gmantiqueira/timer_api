const express = require("express");
const routes = express.Router();

const controllers = require("./app/controllers");

routes.post("/user/signup", controllers.UserController.createUser);
routes.delete("/user/:id/delete", controllers.UserController.destroyUser);
routes.get("/user", controllers.UserController.listUsers);

routes.get("/session", controllers.SessionController.listSessions);
routes.get("/session/:session", controllers.SessionController.getSession);
routes.delete("/session/:id", controllers.SessionController.destroySession);
routes.put("/session/:id/change", controllers.SessionController.changeSession);

routes.post(
    "/session/:id/timerlist/:value",
    controllers.TimerListController.addTimer
);
routes.delete(
    "/session/:id/timerlist/:value",
    controllers.TimerListController.removeTimer
);

routes.put("/session/:id/pause", controllers.TimerController.pauseTimer);
routes.put("/session/:id/resume", controllers.TimerController.resumeTimer);
routes.put("/session/:id/update", controllers.TimerController.updateTimer);
routes.put("/session/:id/set", controllers.TimerController.setTimer);
routes.put("/session/:id/stop", controllers.TimerController.stopTimer);

routes.put("/session/:id/color", controllers.StyleController.updateColor);
routes.put("/session/:id/orientation", controllers.StyleController.updateOrientation);

module.exports = routes;
