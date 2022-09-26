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
const { Op, where } = require("sequelize")


const productController = {

    addProduct: async (req, res) => {
        try{
            const {
                product_name, 
                bpom_code, 
                type,
                desc,
                type_hist,
                id_product,
                id_unit,
                description,
                composition,
                warning,
                expire,
                stock, 
                init_price, 
                sell_price, 
                amount_per_stock,
            } = req.body

            console.log(req.body)

            // const arr_cat = [14, 11];

            const { filename } = req.file
            
            const newProduct = await Product.create({
                product_name,
                bpom_code,
                type: type,  
            })

            arr_cat.map((val) => (
                ProductCategory.create({
                    id_product: newProduct.id,
                    id_category: val
                })
            ))
            
            // const lastCreatedProduct = await Product.max("id")
            // console.log(arr_cat)

            // string_cat.map((val) => {
            //     ProductCategory.create({
            //         id_product: newProduct.id,
            //         id_category: val.id
            //     })
            // })


            await ProductDescription.create({
                description,
                composition,
                warning,
                expire,
                id_product: newProduct.id
            })

            await ProductImage.create({
                product_image: `${process.env.UPLOAD_FILE_DOMAIN}/${process.env.PATH_PRODUCTIMG}/${filename}`,
                id_product: newProduct.id
            })

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

    // <-- Fetch product buat tabel user -->

    getAllProduct4User: async (req, res) => {
        try{
            const { orderby, sort, category, page = 1, limit, searchcondition, category2, category3} = req.query

            let findProduct

            if (!searchcondition) {
                findProduct = await Product.findAll({
                    offset: (page- -1) * limit,
                    limit: limit ? parseInt(limit) : undefined,
                    where: {
                        deletedAt: {
                            [Op.ne] : true
                        }
                    },
                    include: [
                        {model: ProductDescription},
                        {model: ProductCategory,
                        include: 
                        [
                            {model: Category,
                            where: category || category2 || category3 ? {
                                [Op.or]: [{category: `${category}`}, {category: `${category2}`}, {category: `${category3}`}, ]
                            } : {}
                        }],
                    },
                    { model: ProductStock,
                    include: [{model: Unit}],
                    where:{
                        is_converted: {[Op.ne] : true}
                    }
                    },
                    {
                        model : ProductImage
                    },
                ],
                    order: orderby == "product_name" && sort ? [[`${orderby}`, `${sort}`]] :
                    orderby == "sell_price" && sort ? [[ProductStock, `${orderby}`, `${sort}`]]
                    : [],
                })

            } else {
                findProduct = await Product.findAll({
                    offset: (page - 1) * limit,
                    limit: limit ? parseInt(limit) : undefined,
                    where: {
                        product_name: {
                            [Op.substring]: `${searchcondition}`
                        }
                    },
                    include: [
                        {model: ProductDescription},
                        {model: ProductCategory,
                        include: [{
                            model: Category,
                            where: category || category2 || category3 ? {
                                [Op.or]: [{category}]
                            } : {}
                        }],
                    },
                    {
                        model: ProductStock,
                        include: [{
                            model: Unit
                        }],
                        where: {
                            is_converted: {[Op.ne] : true}
                        }
                    },
                    {
                        model : ProductImage
                    }
                ],
                order: orderby == "product_name" && sort ? [[`${orderby}`, `${sort}`]] :
                    orderby == "sell_price" && sort ? [[ProductStock, `${orderby}`, `${sort}`]]
                    : [],
                })
            }

            return res.status(200).json({
                message: "fetching data",
                result: findProduct
            })
            
        } catch (err) {
            console.log(err)

            res.status(400).json({
                message: err.toString()
            })
        }
    },

    // <-- Fetch product buat tabel admin -->

    getAllProduct4Admin: async (req, res) => {
        try{
            const { orderby, sort, category1, page = 1, limit, searchcondition, category2, category3} = req.query

            let findProduct

            if (!searchcondition) {
                findProduct = await Product.findAll({
                    offset: (page- -1) * limit,
                    limit: limit ? parseInt(limit) : undefined,
                    where: {
                        deletedAt: {
                            [Op.ne] : true
                        }
                    },
                    include: [
                        {model: ProductDescription},
                        {model: ProductCategory,
                        include: 
                        [
                            {model: Category,
                            where: category1 || category2 || category3 ? {
                                [Op.or]: [{category: `${category1}`}, {category: `${category2}`}, {category: `${category3}`}, ]
                            } : {}
                        }],
                    },
                    { model: ProductStock,
                    include: [{model: Unit}],
                    },
                    {
                        model : ProductImage
                    },
                ],
                    order: orderby == "product_name" && sort ? [[`${orderby}`, `${sort}`]] :
                    orderby == "sell_price" && sort ? [[ProductStock, `${orderby}`, `${sort}`]]
                    : [],
                })

            } else {

                findProduct = await Product.findAll({
                    offset: (page - 1) * limit,
                    limit: limit ? parseInt(limit) : undefined,
                    where: {
                        product_name: {
                            [Op.substring]: `${searchcondition}`
                        }
                    },
                    include: [
                        {model: ProductDescription},
                        {model: ProductCategory,
                        include: [{
                            model: Category,
                            where: category1 || category2 || category3 ? {
                                [Op.or]: [{category1}]
                            } : {}
                        }],
                    },
                    {
                        model: ProductStock,
                        include: [{
                            model: Unit
                        }],
                    },
                    {
                        model : ProductImage
                    }
                ],
                order: orderby == "product_name" && sort ? [[`${orderby}`, `${sort}`]] :
                    orderby == "sell_price" && sort ? [[ProductStock, `${orderby}`, `${sort}`]]
                    : [],
                })
            }

            return res.status(200).json({
                message: "fetching data",
                result: findProduct,
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
                product_name, 
                bpom_code, 
                type,
                desc,
                type_hist,
                id_unit,
                description,
                composition,
                warning,
                expire,
                stock, 
                init_price, 
                sell_price, 
                amount_per_stock,
                arr_cat
            } = req.body

            const { id_prod } = req.params

            console.log(req.body)

            console.log(req.params)

            // const arr_cat = [14, 11];

            const { filename } = req.file
            
            await Product.update({
                product_name,
                bpom_code,
                type: type,  
            },{
                where: {
                    id: id_prod
                }
            })

            const product = await Product.findByPk(id_prod)
            console.log(product)

            arr_cat.map((val) => (
                ProductCategory.update({
                    id_category: val
                },{
                    where: {
                        id_product: id_prod
                    }
                })
            ))
            
            // const lastCreatedProduct = await Product.max("id")
            // console.log(arr_cat)

            // string_cat.map((val) => {
            //     ProductCategory.create({
            //         id_product: newProduct.id,
            //         id_category: val.id
            //     })
            // })


            await ProductDescription.update({
                description,
                composition,
                warning,
                expire,
            },{
                where: {
                    id_product: id_prod
                }
            })

            await ProductImage.update({
                product_image: `${process.env.UPLOAD_FILE_DOMAIN}/${process.env.PATH_PRODUCTIMG}/${filename}`,
            },{
                where: {
                    id_product: id_prod
                }
            })

            await ProductStock.update({
                stock,
                init_price,
                sell_price,
                amount_per_stock,
                id_unit,
                
            },{
                where: {
                    id_product: id_prod
                }
            })

            await StockHistory.update({
                qty: stock,
                type: type_hist,
                desc,
                id_unit,
            },{
                where:{
                    id_product: id_prod
                }
            })

            return res.status(200).json({
                message: "New product created",
                result: product,
            })
        } catch (err) {
            console.log(err)
            
            res.status(400).json({
                message: err.toString()
            })

        }
    },

    getAllProducts: async(req, res) => {
        try{
            const { limit = 10, page = 1 } = req.query

            const findProduct = await Product.findAll({
                include:[ 
                    ProductCategory, 
                    ProductStock, 
                    ProductImage, 
                    ProductDescription, 
                ],
                limit: limit ? parseInt(limit) : null,
                offset: (page - 1) * limit,
                order: [["createdAt", "DESC"]]
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
    }
}

module.exports = productController;
