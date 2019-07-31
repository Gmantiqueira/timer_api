const Session = require("../models/Session");

class SessionController {
    async getSession(req, res) {
        const sessionName = req.params.session;

        if (await Session.findOne({ sessionName })) {
            const session = await Session.findOne({
                sessionName: sessionName
            });

            return res.send(session);
        }

        const session = await Session.create({ sessionName: sessionName });

        return res.json(session);
    }

    async changeSession(req, res) {
        const { sessionName } = req.body;

        await Session.findByIdAndUpdate(req.params.id, {
            sessionName: sessionName
        })

        const updateSession = await Session.findById(req.params.id)

        req.io.emit("updateSession", updateSession)

        return res.json()
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
