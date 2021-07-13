const User = require("../Models/model");

class fetchingUser {
  async getuser(req, res) {
    try {
      const users = await User.find({});
      if (!users) return res.status(404).json({ error: "No User Found" });
      return res.status(200).send({ user: users });
    } catch (error) {
      if (!users) return res.status(500).json({ error:"Sorry Something went wrong" });
    }
  }
}
module.exports = new fetchingUser();
