const Session = require("../models/Session");

class TimerListController {
    async addTimer(req, res) {
        const newTimer = parseInt(req.params.value);

        await Session.findByIdAndUpdate(
            req.params.id,
            { $push: { timerList: { $each: [newTimer], $sort: 1 } } },
            { safe: true, upsert: true },
            function(err, model) {
                console.log(err);
            }
        );

        const addTimer = await Session.findById(req.params.id);

        req.io.emit("addTimer", addTimer.timerList);

        return res.json();
    }

    async removeTimer(req, res) {
        const timerRemoved = parseInt(req.params.value);

        await Session.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    timerList: {
                        $in: [timerRemoved],
                    }
                }
            },
            { multi: true },
            function(err, model) {
                console.log(err);
            }
        );

        const removeTimer = await Session.findById(req.params.id);

        req.io.emit("removeTimer", removeTimer.timerList);

        return res.send();
    }
}

module.exports = new TimerListController();
