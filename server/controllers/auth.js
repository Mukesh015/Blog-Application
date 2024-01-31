const VlogModel = require('../models/vlog')

async function newVlogCreate(req,res){
    const {title,description} = req.body;
      try {
        const newBlog = new VlogModel({
            title:title,
            description : description
        });
        await newBlog.save();
        res.status(201).json('New vlog created');
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to create blog! Server error" });
    };
}

async function getBlog(req,res){
    const {title} = req.body.blogTitle;
    try {
        console.log(title)
        VlogModel.findOne({ title : title })
        .then((result)=>{
            const description = result.description;
            res.status(200).json(description);
        })
    } catch (error) {
        res.status(500).send({message: "Failed to retrieve blog description! Server error"})
    }
}

module.exports = {
    newVlogCreate,getBlog
}