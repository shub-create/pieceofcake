const Banners = require('../models/banner')

exports.addbanner = (req,res,next) => {
    
    const head_tag = req.body.head_tag;
    const description = req.body.description;
    const banner_img = req.body.banner_img;
    const link = req.body.link;

    console.log(head_tag);
    console.log(description);
    console.log(link);


    const banner = new Banners({
        head_tag,
        description,
        banner_img,
        link
    })

    banner.save().then(() => {
        res.status(201).json({
            message: "Banner added"
        })
    }).catch((err)=> {
        res.send(500).json({
            error: err
        })
    }) 

}

exports.getBanner = (req,res,next) => {

    Banners.find().sort({updatedAt: -1}).then((result) => {
      res.status(200).json({
         banners: result
      })
    }).catch((err) => {
     console.log(err);
      res.status(400).json({
         error: err
      })
    })

}