const { Unit } = require ("../lib/sequelize")
const { Op } = require("sequelize")

const unitController = {

    getAllUnit: async (req, res) => {
        try{
            const findUnit = await Unit.findAll({
                limit: 10,
                offset: 0,
                order:[['createdAt', 'ASC']]
            })
            return res.status(200).json({
                message: "fetched data unit",
                results : findUnit,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "error"
            })
        }
    }
}

module.exports = unitController