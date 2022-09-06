const { Address, User } = require("../models");

class AddressController {
  static async addAddress(req, res) {
    try {
      const { id_user } = req.params;
      const newAddress = await Address.create({ ...req.body, id_user });
      return res.status(200).json({
        message: "new Address has been created",
        result: newAddress,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAllAddress(req, res) {
    try {
      let findAddresss = await Address.findAll();

      res.status(200).json({ status: "success", result: findAddresss });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAddressById(req, res) {
    try {
      const { id } = req.params;

      const findAddress = await Address.findAll({
        where: { id },
        include: [User],
      });

      return res.status(200).json({
        message: "Get Address",
        result: findAddress,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async getAddressByUserId(req, res) {
    try {
      const { id_user } = req.params;

      const findAddress = await Address.findAll({
        where: { id_user },
        include: {
          model: User,
          attributes: ["email", "phone", "full_name"],
        },
      });

      return res.status(200).json({
        message: `Get Address`,
        result: findAddress,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async deleteAddress(req, res) {
    try {
      await Address.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ status: "success", data: "deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async editAddress(req, res) {
    try {
      const { id } = req.params;

      await Address.update({ ...req.body }, { where: { id } });

      const address = await Address.findOne({ id });

      return res.status(200).json({
        message: "Address Edited",
        address: address,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }
}

module.exports = AddressController;
