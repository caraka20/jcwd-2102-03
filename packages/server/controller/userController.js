const { User, Address } = require("../models");

class userController {
  static async addUser(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.create({
        username,
        password,
      });
      return res.status(200).json({
        message: "new user has been created",
        result: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAllUser(req, res) {
    try {
      let findUsers = await User.findAll({
        include: [Address],
      });
      res.status(200).json({ status: "success", result: findUsers });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const findUser = await User.findAll({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: "Get User Profile",
        result: findUser,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async editUser(req, res) {
    try {
      const { id } = req.params;

      await User.update({ ...req.body }, { where: { id } });

      const user = await User.findOne({ where: { id } });

      return res.status(200).json({
        message: "User Profile Edited",
        user: user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async deleteUser(req, res) {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ status: "success", data: "deleted" });
  }

  static async uploadProfilePict(req, res) {
    try {
      const { id } = req.params;
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "profile_pict";
      const { filename } = req.file;

      await User.update(
        { image_url: `http://${uploadFileDomain}/${filePath}/${filename}` },
        { where: { id } }
      );
      return res.status(200).json({
        message: "Success change profile picture",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }
}

module.exports = userController;
