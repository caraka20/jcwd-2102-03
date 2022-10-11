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
    },
    
    addUnit: async (req, res) => {
        try{
            const {unit_name} = req.body

            await Unit.create({
                unit_name
            })

            return res.status(200).json({
                message: "New unit created",
            })
            
        }catch (err){
            console.log(err)
            return res.status(500).json({
                message: "Error creating unit"
            })
        }
    },
}

module.exports = unitController