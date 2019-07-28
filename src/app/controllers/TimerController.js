const Session = require("../models/Session");
var moment = require('moment')

class TimerController {
  async pauseTimer(req, res) {
    const session = await Session.findByIdAndUpdate(req.params.id, {
      isPaused: true,
      delayStart: Date.now()
    });

    const pauseTimer = await Session.findById(req.params.id);

    req.io.emit("pauseTimer", pauseTimer);

    return res.json(session);
  }

  async resumeTimer(req, res) {
    var info = await Session.findById(req.params.id)

    var newEndline = info.endline.setMilliseconds(info.endline.getMilliseconds() + (Date.now() - info.delayStart.getTime()))

    const session = await Session.findByIdAndUpdate(req.params.id, {
      isPaused: false,
      endline: newEndline
    });

    // console.log(info.endline.getMilliseconds())

    const resumeTimer = await Session.findById(req.params.id);

    req.io.emit("resumeTimer", resumeTimer)

    return res.json(session);
  }

  async setTimer(req, res) {
    const { totalTime } = req.body;

    moment.locale('pt-BR')

    var endline = moment(moment().add(totalTime, 'm'))

    await Session.findByIdAndUpdate(req.params.id, {
        totalTime: totalTime,
        endline: endline,
        isRunning: true,
        isPaused: false
    });

    const setTimer = await Session.findById(req.params.id);

    req.io.emit("setTimer", setTimer);

    return res.json(setTimer);
  }

  async updateTimer(req, res) {
    var dateNow = new Date();

    const info = await Session.findById(req.params.id);

    var isRunning = dateNow.getTime() >= info.endline.getTime()
    ? false
    : true

    await Session.findByIdAndUpdate(req.params.id, {
      isRunning: isRunning
    });


    req.io.emit("updateTimer", info);

    return res.json(info);
  }

  async stopTimer(req, res) {
    await Session.findByIdAndUpdate(req.params.id, {
        endline: Date.now(),
        isRunning: false,
        isPaused: false
    });

    const stop = await Session.findById(req.params.id)

    req.io.emit("stopTimer", stop);

    return res.json(stop);
  }
}

module.exports = new TimerController();
