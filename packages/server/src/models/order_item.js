const { DataTypes } = require("sequelize")

const OrderItem = (sequelize) => {
    return sequelize.define(
    "order_item", {
        qty:{
            type: DataTypes.INTEGER,
        },
        price:{
            type: DataTypes.STRING
        }
    }, {
        paranoid: true
    })
}

module.exports = OrderItem