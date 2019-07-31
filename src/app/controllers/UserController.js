const User = require('../models/User')
const md5 = require('md5');

class UserController {
  async createUser (req, res) {
    const { email, username } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'A User with that e-mail already exists' })
    }

    const hash = md5(email.toLowerCase());
    const gravatar_url = `https://www.gravatar.com/avatar/${hash}?s=200`;

    const user = await User.create({
        username: username,
        email: email,
        gravatar: gravatar_url
    })

    return res.json(user)
  }

  async destroyUser(req, res) {
    await User.findByIdAndDelete(req.params.id);

    return res.send();
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
