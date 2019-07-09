const Session = require("../models/Session");

class TimerController {
  async pauseTimer(req, res) {
    await Session.findByIdAndUpdate(req.params.id, {
      isPaused: true
    });

    const pauseTimer = await Session.findById(req.params.id);

    req.io.emit("pauseTimer", pauseTimer);

    return res.send();
  }

  async resumeTimer(req, res) {
    await Session.findByIdAndUpdate(req.params.id, {
      isPaused: false
    });

    const resumeTimer = await Session.findById(req.params.id);

    req.io.emit("resumeTimer", resumeTimer)

    return res.send();
  }

  async setTimer(req, res) {
    const { totalTime } = req.body;
    var dateNow = new Date();

    await Session.findByIdAndUpdate(req.params.id, {
      endline: dateNow.setMinutes(dateNow.getMinutes() + totalTime),
    });

    const setTimer = await Session.findById(req.params.id);

    req.io.emit("setTimer", setTimer);

    return res.json();
  }

  async updateTimer(req, res) {
    const { totalTime } = req.body;
    var dateNow = new Date();

    await Session.findByIdAndUpdate(req.params.id, {
      totalTime: totalTime,
      isRunning:
        dateNow >= dateNow.setMinutes(dateNow.getMinutes() + totalTime)
          ? false
          : true
    });

    const updateTimer = await Session.findById(req.params.id);

    req.io.emit("updateTimer", updateTimer);

    return res.json();
  }
}

module.exports = new TimerController();
