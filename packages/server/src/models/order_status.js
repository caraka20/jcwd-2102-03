const { DataTypes } = require("sequelize")

const OrderStatus = (sequelize) => {
    return sequelize.define(
    "order_status", {
        status:{
            type: DataTypes.STRING,
        },
    }, {
        paranoid: true
    })
}

module.exports = OrderStatus