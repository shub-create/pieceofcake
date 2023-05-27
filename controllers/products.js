const Products = require('../models/product');


exports.getAllProduct = (req,res,next) => {

       Products.find().then((result) => {
         res.status(200).json({
            products: result
         })
       }).catch((err) => {
        console.log(err);
         res.status(400).json({
            error: err
         })
       })

}

exports.searchProduct = (req,res,next) => {

    const searchTerm = req.query.searchTerm;

    Products.find({
        "$or": [
            { title: { '$regex': searchTerm, '$options': 'i' } },
            { category: { '$regex': searchTerm, '$options': 'i' } },
            { description: { '$regex': searchTerm, '$options': 'i' } },
            { tag: { '$regex': searchTerm, '$options': 'i' } },
        ]
    }).then((result)=> {
        res.status(200).json({
            product: result
        })
    }).catch((err) => {
        console.log(err);
         res.status(400).json({
            error: err
         })
    })
}

exports.getProductById = (req,res,next) => {
    
    const productId = req.params.productId;

    Products.findById(productId).then((result) => {
        res.status(200).json({
            product: result
        })
    }).catch((err) => {
        console.log(err);
         res.status(400).json({
            error: err
         })
    })

}

exports.getProductByCategory = (req,res,next) => {

    const category = req.query.category;
    const productId = req.query.productId;

    if(productId){

        Products.find({category: { '$regex': category, '$options': 'i' }, _id : { $ne: productId}}).then((result) => {

            if(result.length>0){
                res.status(200).json({
                    related_products: result
                })
            }
            else {
                res.status(200).json({
                    message: "No items found!"
                })
            }
            
        }).catch((err) => {
            console.log(err);
             res.status(400).json({
                error: err
             })
        })

    }
    else {
        Products.find({category: { '$regex': category, '$options': 'i' }}).then((result) => {

            console.log(result)

            if(result.length>0) {
                res.status(200).json({
                    products: result
                })
            }
            else{
                res.status(200).json({
                    message: "No items found!"
                })
            }
            
        }).catch((err) => {
            console.log(err);
             res.status(400).json({
                error: err
             })
        })
    }

    
    
}

exports.addProduct = (req,res,next) => {

    const title = req.body.title;
    const description = req.body.description;
    const cover_image = req.body.cover_image;
    const price = req.body.price;
    const category = req.body.category;
    const image_arr = req.body.image_arr;

    const product = new Products({
        title,
        description,
        cover_image,
        price,
        category,
        image_arr
    })

    product.save().then(() => {
        res.status(201).json({
            message: "Product added"
        })
    }).catch((err)=> {
        res.send(500).json({
            error: err
        })
    }) 

}

exports.deleteProduct = (req,res,next) => {

    const productId = req.query.productId;

    Products.findByIdAndDelete(productId).then(() => {
         res.json({
                message: "Product Deleted"
            })
        }
    ).catch((err)=> {
        res.send(500).json({
            error: err
        })
    }) 
    
}

exports.updatePrice = (req,res,next) => {

    const productId = req.body.productId;
    const newPrice = req.body.price
    
    Products.findByIdAndUpdate(productId,{price: newPrice}).then(()=>{
        res.json({
            message: "Price Updated Successfully!"
        })
    }).catch((err) => {
        res.json({
            error: err
        })
    })
    
}

exports.updateRating = (req,res,next) => {

    const rating = req.body.rating;
    const productId = req.body.productId;



    Products.findById(productId).then((result) => {
        if(!result) {
            res.json({
                message: "No product found!"
            })
        }
        else {
            result.updateOne({$push : {rating : rating}}).then(()=> {
                res.json({
                    message: "Updated successfully"
                })
            }).catch((err) => {
                res.json({
                    error: err
                })
            })
            
        }
    }).catch((err) => {
        res.json({
            error: err
        })
    })
    
}

