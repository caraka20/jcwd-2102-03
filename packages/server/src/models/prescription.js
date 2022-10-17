const { DataTypes } = require("sequelize")

const Prescription = (sequelize) => {
    return sequelize.define(
    "prescription", {
        image:{
            type: DataTypes.STRING,
        },
    }, {
        paranoid: true
    })
}

module.exports = Prescription