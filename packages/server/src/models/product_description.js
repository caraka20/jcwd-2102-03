const { DataTypes } = require("sequelize")

const ProductDescription = (sequelize) => {
    return sequelize.define(
    "ProductDescription", {
        description:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true
    })
}

module.exports = ProductDescription