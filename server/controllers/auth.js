const { VlogModel, UserModel,FeedbackModel,ContactModel } = require("../models/vlog");
const {createAndSendToken} = require('../middlewares/auth')
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const secretKey = process.env.JWT_SECRET;

async function newVlogCreate(req, res) {
  const { title, description } = req.body;
  try {
    const newBlog = new VlogModel({
      title: title,
      description: description,
    });
    await newBlog.save();
    res.status(201).json("New vlog created");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to create blog! Server error" });
  }
}

async function postNewQuery(req, res) {
  const { query, email } = req.body;
  try {
    const newPost = new VlogModel({
      query: query,
      senderEmail: email,
    });
    await newPost.save();
    res.status(201).json("New query sucessfully post");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to post query! Server error" });
  }
}

async function getBlog(req, res) {
  const { query } = req.body;
  console.log(query);

  try {
      const existquery = await VlogModel.findOne({ query: query });

      if (existquery) {
          const keysToExtract = ["description", "authorName"];
          
          const extractedData = {};
          
          keysToExtract.forEach(key => {
              if (existquery[key] !== undefined) {
                  extractedData[key] = existquery[key];
              }
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


async function getAllBlog(req, res) {
  try {
    const popularBlog = await VlogModel.find({});

    if (popularBlog.length > 0) {
      const keysToExtract = ["query", "description", "authorName"];

      const extractedData = popularBlog.map((popularBlog) => {
        const extractedUser = {};

        keysToExtract.forEach((key) => {
          if (popularBlog[key] !== undefined) {
            extractedUser[key] = popularBlog[key];
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
      { query: query },
      {
        $push: {
          description: description,
          authorName: authorName,
          authorEmail: authorEmail,
        },
      }
    );
    console.log(
      `Received data. Query-${query} Description-${description} Added by-${authorName}`
    );
    res.status(200).send("Comment added successfully");
  } catch (error) {
    console.error("Failed to update your comment", error);
    res.status(500).send("Internal Server Error");
  }
}

async function register(req, res) {
  const { username, email, password } = req.body;
  try {
    console.log(
      `Received data: Name - ${username},Email - ${email},Password - ${password}`
    );
    const newUser = new UserModel({
      username,
      email,
      password,
    });
    await newUser.save();
    createAndSendToken(newUser, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (user.password === password) {
      const username = user.username;
      const newUser = new UserModel({
        username,
        email,
        password,
      })
      createAndSendToken(newUser, 202, res);
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
}

async function welcome(req,res){
  res.status(200).json('welcome');
}

async function decodeJWT(req,res){
  const token = req.body.token;
  console.log('try to extract email')
  if (!token) {
    return res.status(400).json({ error: 'Token not provided' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const email = decoded.email;
    const username = decoded.username;
    res.status(201).json({ email: email, username: username });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}


async function getComments(req, res) {
  const { authorEmail } = req.body;
  console.log("Try to fetch your posts from " + authorEmail);

  try {
    const result = await VlogModel.find({
      "authorEmail": { $exists: true, $ne: [] },
      "authorEmail": authorEmail
    });

    if (result.length > 0) {
      const extractedData = result.map(resultItem => {
        const descriptions = [];
        const query = [];

        resultItem.authorEmail.forEach((email, index) => {
          if (email === authorEmail && resultItem.description && resultItem.description[index] !== undefined) {
            const updatedAt = resultItem.updatedAt; // Assuming the timestamp field is named "createdAt"
            const timestamp = new Date(updatedAt).toLocaleString("en-US", { timeZone: "Asia/Kolkata" }); // Generate timestamp for this description
            descriptions.push({ index, description: resultItem.description[index], timestamp });
            query.push({ query: resultItem.query });
          }
        });

        return { query, descriptions };
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


async function getPosts(req, res) {
  const { senderEmail } = req.body;
  console.log('try fetch post from ',senderEmail)
  try {
    const posts = await VlogModel.find({senderEmail:senderEmail});
    if (posts.length > 0) {
      const keysToExtract = ["query"];

      const extractedData = posts.map((posts) => {
        const extractedUser = {};

        keysToExtract.forEach((key) => {
          if (posts[key] !== undefined) {
            extractedUser[key] = posts[key];
          }
        });

        return extractedUser;
      });

      res.status(200).json(extractedData);
    } else {
      res.status(404).json({ msg: "No documents found" });
    }
  }
  catch(error){
    console.error("Retrieve operation failed!", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }

}



async function getInboxes(req, res) {
  const { senderEmail } = req.body;
  console.log(`Try to fetch ${senderEmail} Inboxes`);

  try {
    const existInboxes = await VlogModel.find({ senderEmail: senderEmail });

    if (existInboxes.length > 0) {
      const keysToExtract = ["query", "description", "authorName"];
      
      const extractedData = existInboxes.map(inbox => {
        const extracted = {};
        keysToExtract.forEach(key => {
          if (inbox[key] !== undefined) {
            extracted[key] = inbox[key];
          }
        });
        return extracted;
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



async function getPopularBlog(req,res){

  console.log('try to fetch popular Blog')

  try {
    const popularBlog = await VlogModel.find({});

    if (popularBlog.length > 0) {
      const keysToExtract = ["query", "description"];

      const extractedData = popularBlog.map((popularBlog) => {
        const extractedUser = {};

        keysToExtract.forEach((key) => {
          if (popularBlog[key] !== undefined) {
            extractedUser[key] = popularBlog[key];
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

async function getAllquery(req,res){
  try {
    const allQuery = await VlogModel.find({});

    if (allQuery.length > 0) {
      const keysToExtract = ["query"];

      const extractedData = allQuery.map((allQuery) => {
        const extractedUser = {};

        keysToExtract.forEach((key) => {
          if (allQuery[key] !== undefined) {
            extractedUser[key] = allQuery[key];
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



async function getSolvequery(req,res){
  const {senderEmail}=req.body
  try {
    const solveQuery = await VlogModel.find({ senderEmail: { $ne: senderEmail } });

    if (solveQuery.length > 0) {
      const keysToExtract = ["query"];

      const extractedData = solveQuery.map((solveQuery) => {
        const extractedUser = {};

        keysToExtract.forEach((key) => {
          if (solveQuery[key] !== undefined) {
            extractedUser[key] = solveQuery[key];
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

async function submitFeedback(req,res){
{
  const {  email, message } = req.body;
  try {
    console.log(
      `Received data: Email - ${email},Message - ${message}`
    );
    const newFeedback = new FeedbackModel({
 
      email,
      message,
    });
    await newFeedback.save();
    createAndSendToken(newFeedback, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
}
}

async function submitISsues(req,res){

  const { name, email, issue } = req.body;
  try {
    console.log(
      `Received data: Name - ${name},Email - ${email},Issues - ${issue}`
    );
    const newIssue = new ContactModel({
      name,
      email,
      issue,
    });
    await newIssue.save();
    createAndSendToken(newIssue, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }

}





module.exports = {
  newVlogCreate,
  getBlog,
  postNewQuery,
  getAllBlog,
  addComment,
  register,
  login,
  welcome,
  decodeJWT,
  getComments,
  getPosts,
  getInboxes,
  getPopularBlog,
  getAllquery,
  getSolvequery,
  submitFeedback,
  submitISsues
};
