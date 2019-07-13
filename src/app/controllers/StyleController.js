const Session = require("../models/Session");

class StyleController {
    async updateColor(req, res){
        const {newColor} = req.body

        await Session.findByIdAndUpdate(req.params.id, {
            baseColor: newColor
        })

        const updateColor = await Session.findById(req.params.id)

        req.io.emit("updateColor", updateColor)

        return res.json()
    }

    async updateOrientation(req, res){
        const {newOrientation} = req.body

        await Session.findByIdAndUpdate(req.params.id, {
            orientation: newOrientation
        })

        const updateOrientation = await Session.findById(req.params.id)

        req.io.emit("updateOrientation", updateOrientation)

        return res.json()
    }
}

module.exports = new StyleController();
