const Session = require("../models/Session");

class SessionController {
    async getSession(req, res) {
        const sessionName = req.params.session;

        if (await Session.findOne({ sessionName })) {
            const session = await Session.findOne({
                sessionName: req.params.session
            });

            return res.send(session);
        }

        const session = await Session.create({ sessionName: sessionName });

        return res.json(session);
    }

    async destroySession(req, res) {
        await Session.findByIdAndDelete(req.params.id);

        return res.send();
    }

    async listSessions(req, res) {
        Session.find({}, function(err, sessions) {
            var sessionMap = {};

            sessions.forEach(function(session) {
                sessionMap[session._id] = session;
            });

            res.send(sessionMap);
        });
    }
}

module.exports = new SessionController();
