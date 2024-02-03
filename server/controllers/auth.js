const { error } = require('console');
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


async function postNewQuery(req,res){
    const {query,email} = req.body;
    try {
        const newPost = new VlogModel({
            query:query,
            senderEmail : email
        });
        await newPost.save();
        res.status(201).json('New query sucessfully post');
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to post query! Server error" });
    };

}


async function getBlog(req, res) {
    const { query } = req.body;

    try {

        const result = await VlogModel.findOne({ query: query });

        if (result) {
            const description = result.description;
            res.status(200).json({ description: description });
        } else {
            res.status(404).json({ message: `${query} not found` });
        }
    } catch (error) {
        console.error("Error retrieving blog description:", error);
        res.status(500).json({ message: "Failed to retrieve blog description! Server error" });
    }
}


async function getAllBlog(req,res){

    try {
        const queries = await VlogModel.find({});
    
        if (queries.length > 0) {
          const keysToExtract = [
            "query",
            "description",
            "authorName"
          ];
    
          const extractedData = queries.map(queries => {
            const extractedUser = {};
    
            keysToExtract.forEach(key => {
              if (queries[key] !== undefined) {
                extractedUser[key] = queries[key];
              }
            });
    
            return extractedUser;
          });
    
          res.status(200).json(extractedData);
        } else {
          res.status(404).json({ msg: "No documents found" });
        }
      } catch (error) {
        console.error("Retrieve operation failed!", error);
        res.status(500).json({ msg: "Internal Server Error" });
      }
    }
    
async function addComment(req, res) {
    const { query, description, authorName, authorEmail } = req.body;
    
    try {
        await VlogModel.updateOne(
            { query: query }, // Use the appropriate filter to identify the document
            {
                $push: {
                        
                        description: description,
                        authorName: authorName,
                        authorEmail: authorEmail,
                
                    },
                }
            );
            console.log(`Received data. Query-${query} Description-${description} Added by-${authorName}`);
            res.status(200).send("Comment added successfully");
        } catch (error) {
            console.error("Failed to update your comment", error);
            res.status(500).send("Internal Server Error");
        }
    }
    


module.exports = {
    newVlogCreate,getBlog,postNewQuery,getAllBlog,addComment
}