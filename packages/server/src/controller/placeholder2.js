getProductPaging: async (req, res) => {
    try {
      const { limit , page = 1, search, category, category2, category3, sort, orderby } = req.query;
      
      let findProduct

      if(!search) {
        findProduct= await Product.findAll({
        offset: (page - 1) * limit,
        limit: limit ? parseInt(limit) : undefined,
        include: [
          { model: Product_description },
          { model : Product_category,
            include: [{model: Category, 
            // where: category ? { category: `${category}`} : {}
            where: category || category2 || category3 ? {
            [Op.or]: [{category: `${category}`}, {category: `${category2}`},{category: `${category3}`}, ]
            } : {}
          }],
          },
          { model : Product_stock,
            include: [{model: Unit}],
            where: {
            converted: {[Op.notIn]:[1]}
            }
          },
          { model : Product_image,
          },
        ],
        order: orderby == 'product_name' && sort ? [[`${orderby}`, `${sort}`]] : 
        orderby == 'selling_price' && sort ? [[Product_stock, `${orderby}`, `${sort}`]]
        :[],
        
      });
      } else {
        findProduct= await Product.findAll({
        offset: (page - 1) * limit,
        limit: limit ? parseInt(limit) : undefined,
        where: {
          product_name: {
          [Op.substring]: `${search}`
          }
        },
        include: [
          { model: Product_description },
          { model : Product_category,
            include: [{model: Category, 
            // where: category ? { category: `${category}`} : {}
            where: category || category2 || category3 ? {
            [Op.or]: [{category: `${category}`}, {category: `${category2}`},{category: `${category3}`}, ]
            } : {}
          }],
          },
          { model : Product_stock,
            include: [{model: Unit}],
            where: {
            converted: {[Op.notIn]:[1]}
            }
          },
          { model : Product_image,
          },
        ],
        order: orderby == 'product_name' && sort ? [[`${orderby}`, `${sort}`]] : 
        orderby == 'selling_price' && sort ? [[Product_stock, `${orderby}`, `${sort}`]]
        :[],
      });
      }

      return res.status(200).json({
        message: "fetching data",
        result: findProduct,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: err.toString(),
      });
    }
  }