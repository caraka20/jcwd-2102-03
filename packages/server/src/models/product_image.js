const { DataTypes } = require("sequelize")

const ProductImage = (sequelize) => {
    return sequelize.define(
    "product_image", {
        product_image:{
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        paranoid: true
    })
}

module.exports = ProductImage