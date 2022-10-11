const { 
    StockHistory,
    Unit,
    Product,
} = require ("../lib/sequelize")
const { Op } = require("sequelize");


const StockHistoryController = {
    getAllHistory: async(req, res) => {
        try{
            const findStockHistory = await StockHistory.findAll({
                order:[["createdAt", "ASC"]]
            })
            
            return res.status(200).json({
                message: "fetching stock history",
                results: findStockHistory
            })

        } catch (err){
            console.log(err)

            res.status(400).json({
                message: "error fetching stock history"
            })
        }
    },
    getHistoryWithParams: async(req, res) => {
        try{

            const {limit, page = 1, orderby, sort} = req.query

            const findStockHistory = await StockHistory.findAll({
                include:[
                    {model: Unit},
                    {model: Product}
                ],
                limit: limit ? parseInt(limit) : null,
                offset:(page-1) * limit,
                order:[[orderby, sort]]
            })

            return res.status(200).json({
                meesage: "fetching stock history",
                results: findStockHistory
            })
        } catch (err) {
            return res.status(400).json({
                message: "error fetching stock history",
            })
        }
    }
}

module.exports = StockHistoryController;