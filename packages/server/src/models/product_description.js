const { DataTypes } = require("sequelize")

const ProductDescription = (sequelize) => {
    return sequelize.define(
    "product_description", {
        description:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true
    })
}

module.exports = ProductDescription