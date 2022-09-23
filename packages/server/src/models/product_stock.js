const { DataTypes } = require("sequelize")

const ProductStock = (sequelize) => {
    return sequelize.define(
    "ProductStock", {
        stock:{
            type: DataTypes.STRING,
            allowNull: false
        },
        total_sold:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        init_price:{
            type: DataTypes.STRING,
            allowNull: false
        },
        sell_price:{
            type: DataTypes.STRING,
            allowNull: false
        },
        is_converted:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        amount_per_stock:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        paranoid: true
    })
}

module.exports = ProductStock