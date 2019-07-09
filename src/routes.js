const express = require("express");
const routes = express.Router();

const controllers = require("./app/controllers");

routes.post("/user", controllers.UserController.store);

routes.get("/session", controllers.SessionController.listSessions);
routes.get("/session/:session", controllers.SessionController.getSession);
routes.delete("/session/:id", controllers.SessionController.destroySession);

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

module.exports = routes;
