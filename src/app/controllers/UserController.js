const User = require('../models/User')
const md5 = require('md5');

class UserController {
  async createUser (req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create(req.body)

    return res.json(user)
  }

  async setNickname(req, res){
    const {email, username} = req.body

    const nickname = await User.findOneAndUpdate({
        email: email
    }, {
        username: username
    })

    return res.send(nickname)
  }

  async destroyUser(req, res) {
    await User.findByIdAndDelete(req.params.id);

    return res.send();
}

  async setGravatar(req, res){
    const {email} = req.body

    const hash = md5(email.toLowerCase());
    const gravatar_url = `https://www.gravatar.com/avatar/${hash}?s=200`;
    const gravatar = await User.findOneAndUpdate({
        email: email
    }, {
        gravatar: gravatar_url
    })

    return res.send(gravatar)
  }

  async listUsers(req, res){
    User.find({}, function(err, users) {
        var userMap = {};

        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
  }
}

module.exports = new UserController()
