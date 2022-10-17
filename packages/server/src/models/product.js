const { DataTypes } = require("sequelize")

const Product = (sequelize) => {
    return sequelize.define(
    "product", {
        product_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        bpom_code:{
            type: DataTypes.STRING
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true
    })
}

module.exports = Product