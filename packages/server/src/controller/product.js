const { 
    Product, 
    Category, 
    ProductCategory, 
    ProductStock, 
    ProductImage, 
    ProductDescription, 
    Unit,
    StockHistory
} = require ("../lib/sequelize")
const { Op } = require("sequelize");
const { create } = require("sequelize/lib/model");


const productController = {
    
    getAllProducts: async(req, res) => {
        try{
            const { limit = 5, page = 1 , order, category} = req.query

            const findProduct = await ProductStock.findAll({
                include:[
                    {model: Unit},
                    {model: Product,
                        include:[
                            {model: ProductImage},
                        ]}
                ],
                limit: limit ? parseInt(limit) : null,
                offset: (page - 1) * limit,
                order: [["createdAt", "ASC"]]
            });

            return res.status(200).json({
                message: "fetching product",
                results: findProduct,
            })

        } catch (err) {
            console.log(err)

            res.status(400).json({
                message: "Error fetching"
            })
        }
    },

    getProductWithParams: async(req, res) => {
        try{
            const { limit , page = 1 , orderby, sort, category} = req.query

                if(category){
                    const findProduct = await Product.findAll({
                        include:[
                                {model: Unit , through : { attributes: ["stock", "total_sold", "init_price", "sell_price", "is_converted", "amount_per_stock", "createdAt", "updatedAt", 'id_unit', 'id_product' ] }},
                                {model: ProductImage},
                                {model: ProductDescription},
                                {model: Category,
                                    where:
                                    { id : {[Op.eq] : `${category}` } } }
                        ],
                        limit: limit ? parseInt(limit) : null,
                        offset: (page -1) * limit,
                        order: orderby == "product_name" ? [[ orderby, sort]] :
                        orderby == "sell_price" ?
                        [[{ model: Unit, through: {model: ProductStock}},  `${orderby}`, `${sort}`]]

                        
                        // [[Unit, `${orderby}`, `${sort}`]] 
                        : [] }
                    );
        
                    return res.status(200).json({
                        message: "fetching product",
                        results: findProduct,
                    })
                } else {
                    console.log("asd")
                    const findProduct = await Product.findAll({
                        include:[
                            {model: Unit , through : { attributes: ["stock", "total_sold", "init_price", "sell_price", "is_converted", "amount_per_stock", "createdAt", "updatedAt",'id_unit', 'id_product' ]}},
                            {model: ProductImage},
                            {model: ProductDescription},
                            {model: Category}
                    ],
                    limit: limit ? parseInt(limit) : null,
                    offset: (page -1) * limit,
                    order: orderby == "product_name" ? [[ orderby, sort]] :
                    orderby == "sell_price" ?
                    [[{ model: Unit,  as: 'Units' },  `${orderby}`, `${sort}`]]

                    
                    // [[Unit, `${orderby}`, `${sort}`]] 
                    : [] 
                } );
                return res.status(200).json({
                    message: "fetching product",
                    results: findProduct,
                })
                    };
                    
                } catch (err) {
                    console.log(err)

                    res.status(400).json({
                        message:  res.status.message
                    })
            }
    },

    addProduct: async (req, res) => {
        try{
            const {
                product_name, 
                bpom_code, 
                type,
                product_image,
                id_unit,
                description,
                stock, 
                init_price, 
                sell_price, 
                amount_per_stock,
                desc,
                type_hist,
                category1,
            } = req.body

            console.log(req.body)

            const { filename } = req.file
            
            const newProduct = await Product.create({
                product_name,
                bpom_code,
                type: type,  
            })

            ProductCategory.create({
                id_product: newProduct.id,
                id_category: category1
            })

            await ProductDescription.create({
                description,
                id_product: newProduct.id
            })

            if(filename){
                await ProductImage.create({
                    product_image: `${process.env.UPLOAD_FILE_DOMAIN}/${process.env.PATH_PRODUCTIMG}/${filename}`,
                    id_product: newProduct.id
                })
            }

            await ProductStock.create({
                stock,
                init_price,
                sell_price,
                amount_per_stock,
                id_product: newProduct.id,
                id_unit,
            })

            await StockHistory.create({
                qty: stock,
                type: type_hist,
                desc,
                id_unit,
                id_product: newProduct.id
            })

            return res.status(200).json({
                message: "New product created",
                result: newProduct,
            })
        } catch (err) {
            console.log(err)
            
            res.status(400).json({
                message: err.toString()
            })

        }
    },

    updateProduct: async (req, res) => {
        try{
            const {
                id,
                product_name, 
                bpom_code, 
                type,
                id_unit,
                description,
                stock, 
                init_price, 
                sell_price, 
                amount_per_stock,
                desc,
                type_hist,
                category1,
            } = req.body

            console.log(req.body)

            const filename = req.file?.filename
            
            await Product.update({
                product_name,
                bpom_code,
                type: type,  
            },{
                where:{
                    id: id
                }
            })

            ProductCategory.update({
                id_category: category1
            },{
                where:{
                    id_product: id,
                }
            })

            await ProductDescription.update(
                {
                    description,
                },
                {
                    where:{
                        id_product: id
                    }
                }
            )

            await ProductStock.update(
                {
                stock,
                init_price,
                sell_price,
                amount_per_stock,
                id_unit,
                },
                {
                    where: {
                        [Op.and]:[
                            {id_product: id},
                           {amount_per_stock: {[Op.ne] : null}}
                       ]
                    }
                }
            )

            await StockHistory.create({
                qty: stock,
                type: type_hist,
                desc,
                id_unit,
                id_product: id
            })

            if(filename){
                await ProductImage.update(
                    {
                        product_image: `${process.env.UPLOAD_FILE_DOMAIN}/${process.env.PATH_PRODUCTIMG}/${filename}`,
                    },
                    {
                        where:{
                            id_product: id
                        }
                    }
                )
            }

            return res.status(200).json({
                message: "Product updated",
            })
        } catch (err) {
            console.log(err)
            
            res.status(400).json({
                message: err.toString()
            })

        }
    },

    deleteProduct: async (req, res) => {

        try{
            
            const { id } = req.params
            const { id_unit } = req.body
            
            await StockHistory.create({
                qty: 0,
                type: "Update Stock",
                desc: "Product dihapus",
                id_unit,
                id_product: id
            })

            ProductCategory.destroy(
                {   
                    where: {
                        id_product: id,
                    }
                }
            )
            
            await ProductDescription.destroy(
                {
                    where:{
                        id_product: id
                    }
                }
                )
                

                await ProductImage.destroy(
                    {
                        where:{
                            id_product: id
                        }
                    }
            )
            
            await ProductStock.destroy(
                {
                    where: {
                        id_product: id,
                    }
                }
            )

            await Product.destroy({
                where: {
                    id: id,
                }  
            })
            
            
            return res.status(200).json({
                message: "Product updated",
            })
        } catch (err) {
            console.log(err)
            
            res.status(400).json({
                message: err.toString()
            })

        }
    },

    updateProductStock: async(req, res) => {
        try{
            
            const {id} = req.params
            const {stock, id_unit, id_prod} = req.body

            await ProductStock.update(
                {
                stock: stock
                },
                {
                    where:{
                        id: id
                    }
                }
            )
            
            await StockHistory.create({
                qty: stock,
                type: "Update",
                desc: "Update Stock",
                id_unit,
                id_product: id
            })

            return res.status(200).json({
                message: "Stock Updated"
            })

        } catch {
            console.log(err)
            
            res.status(400).json({
                message: err.toString()
            })
        }
    },

    convertProduct: async (req, res) => {
        try{
            const {id} = req.params

            const {
                id_unit,
                id_unit2,
                init_price, 
                sell_price, 
                amount_per_stock,
                is_converted,
            } = req.body

            // console.log(req.body)

            let aps = amount_per_stock
            aps = parseInt(amount_per_stock)
            
            if(is_converted){
                
                const convertTarget = ProductStock.findOne({
                    where: {
                        [Op.and]:[
                             {id_product: id},
                            {is_converted: true}
                        ]
                    }
                })

                let newStock = convertTarget.stock - 1

                // console.log("This is new Stock " + newStock)

                await ProductStock.update({
                    stock: newStock,
                    is_converted: false
                },{
                    where:{
                        [Op.and]:[
                            {id_product: id},
                           {is_converted: true},
                           {amount_per_stock: {[Op.eq]: null}}
                       ]
                    }
                })
                
                await ProductStock.create({
                    id_product: id,
                    sell_price: sell_price,
                    init_price: init_price,
                    id_unit: id_unit2,
                    stock: amount_per_stock,
                    is_converted: true
                })
                
            } else {

                const convertTarget = await ProductStock.findOne({
                    where: {
                        [Op.and]:[
                             {id_product: id},
                            {is_converted: false}
                        ]
                    }
                })

                const convertedProduct = await ProductStock.findOne({
                    where:{
                        [Op.and]:[
                            {id_product: id},
                           {is_converted: true}
                       ]
                    }
                })

                console.log(convertTarget)
                // console.log(convertedProduct)
                
                let newStock = convertTarget.stock - 1
                let addStock = convertedProduct.stock + aps

                console.log("This is new Stock " + newStock)
                
                await ProductStock.update({
                    stock: newStock,
                },{
                    where:{
                        [Op.and]:[
                            {id_product: id},
                           {is_converted: true}
                       ]
                    }
                })

                
                await ProductStock.update({
                    stock: addStock,
                },{
                    where:{
                        [Op.and]:[
                            {id_product: id},
                           {is_converted: false}
                       ]
                    }
                })
            }

            await StockHistory.create({
                qty: 1,
                type: "Conversion",
                desc: "Pengurangan",
                id_unit: id_unit,
                id_product: id
            })
            
            await StockHistory.create({
                qty: amount_per_stock,
                type: "Conversion",
                desc: "Penambahan",
                id_unit: id_unit2,
                id_product: id
            })
            

        } catch (err) {
            console.log(err)
            
            res.status(400).json({
                message: err.toString()
            })
        }
    },
    
}

module.exports = productController;
