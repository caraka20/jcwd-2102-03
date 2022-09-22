const { DataTypes } = require("sequelize")

const ProductImage = (sequelize) => {
    return sequelize.define(
    "ProductImage", {
        product_image:{
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        paranoid: true
    })
}

module.exports = ProductImage