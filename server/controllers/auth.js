const {
  VlogModel,
  UserModel,
  FeedbackModel,
  ContactModel,
} = require("../models/vlog");
const {
  createAndSendToken,
  transporter,
  isPasswordComplex,
} = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const cloudinary = require("cloudinary").v2;
const secretKey = process.env.JWT_SECRET;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

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
  // require("events").EventEmitter.defaultMaxListeners = 15;
  let { query, senderEmail ,queryDescription} = req.body;
  console.log(query, senderEmail, queryDescription);
  query = query.replace(/[(),{}@#$%&*?/"']/g, "").toLowerCase();
  query = query.trim();
  queryDescription = queryDescription.replace(/[(),{}@#$%&*?\n\r/"']/g, "").toLowerCase();
  queryDescription = queryDescription.trim();
  try {
    cloudinary.uploader.upload(req.file.path, async function (err, result) {
      if (err) {
        console.error("Cloudinary upload failed:", err);
        return res
          .status(500)
          .json({ message: "Cloudinary upload failed", error: err });
      }
      const queryPic = result.url;
    const newPost = new VlogModel({
      queryDescription:queryDescription,
      query: query,
      senderEmail: senderEmail,
      queryPic:queryPic
    });
    await newPost.save();
    res.status(201).json("New query sucessfully post");
  })
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

      keysToExtract.forEach((key) => {
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
      const keysToExtract = ["query", "description", "authorName","queryPic"];

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
  let { query, description, authorName, authorEmail } = req.body;
  query = query.replace(/[(){}@#$%&*?/"']/g, "").toLowerCase();
  query = query.trim();
  description = description.replace(/[(){}@#$%&*?/"']/g, "").toLowerCase();
  try {
    const result = await VlogModel.updateOne(
      { query: query },
      {
        $push: {
          description: description,
          authorName: authorName,
          authorEmail: authorEmail,
        },
      }
    );
    res.status(200).send("Comment added successfully");
  } catch (error) {
    console.error("Failed to update your comment", error);
    res.status(500).send("Internal Server Error");
  }
}

async function register(req, res) {
  require("events").EventEmitter.defaultMaxListeners = 15;
  const { username, email, password } = req.body;
  try {
    if (!isPasswordComplex(password)) {
      return res.status(400).json({
        error:
          "Password must contain at least one uppercase letter, one numeric digit, and one special character",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    cloudinary.uploader.upload(req.file.path, async function (err, result) {
      if (err) {
        console.error("Cloudinary upload failed:", err);
        return res
          .status(500)
          .json({ message: "Cloudinary upload failed", error: err });
      }
      const avatar = result.url;
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        avatar,
      });
      await newUser.save();
      createAndSendToken(newUser, 201, res);
    });
  } catch (error) {
    console.log("Failed to save:", error);
    return res
      .status(500)
      .json({ message: "Failed to save user", error: error });
  }
}


async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const username = user.username;
    const avatar = user.avatar;
    const newUser = new UserModel({
      username,
      email,
      password: user.password,
      avatar
    });
    createAndSendToken(newUser, 202, res);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
}

async function welcome(req, res) {
  res.status(200).json("welcome");
}

async function decodeJWT(req, res) {
  const token = req.body.token;
  console.log("try to extract email");
  if (!token) {
    return res.status(400).json({ error: "Token not provided" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const email = decoded.email;
    const username = decoded.username;
    const profileURL = decoded.avatar;
    res
      .status(201)
      .json({ email: email, username: username, profileURL: profileURL });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

async function getComments(req, res) {
  const { authorEmail } = req.body;
  console.log("Try to fetch your posts from " + authorEmail);

  try {
    const result = await VlogModel.find({
      authorEmail: { $exists: true, $ne: [] },
      authorEmail: authorEmail,
    });

    if (result.length > 0) {
      const extractedData = result.map((resultItem) => {
        const descriptions = [];
        const query = [];

        resultItem.authorEmail.forEach((email, index) => {
          if (
            email === authorEmail &&
            resultItem.description &&
            resultItem.description[index] !== undefined
          ) {
            const updatedAt = resultItem.updatedAt; // Assuming the timestamp field is named "createdAt"
            const timestamp = new Date(updatedAt).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            }); // Generate timestamp for this description
            descriptions.push({
              index,
              description: resultItem.description[index],
              timestamp,
            });
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
  console.log("try fetch post from ", senderEmail);
  try {
    const posts = await VlogModel.find({ senderEmail: senderEmail });
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
  } catch (error) {
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

      const extractedData = existInboxes.map((inbox) => {
        const extracted = {};
        keysToExtract.forEach((key) => {
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

async function getPopularBlog(req, res) {
  console.log("try to fetch popular Blog");

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

async function getAllquery(req, res) {
  try {
    const allQuery = await VlogModel.find({});

    if (allQuery.length > 0) {
      const keysToExtract = ["query","queryPic","queryDescription"];

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

async function getSolvequery(req, res) {
  const { senderEmail } = req.body;
  try {
    const solveQuery = await VlogModel.find({
      senderEmail: { $ne: senderEmail },
    });

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

async function submitFeedback(req, res) {
  {
    const { email, message } = req.body;
    try {
      console.log(`Received data: Email - ${email},Message - ${message}`);
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

async function submitISsues(req, res) {
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

async function generateOtp(req, res) {
  const email = req.body;
  let newotp = "";
  for (let i = 0; i <= 3; i++) {
    newotp += Math.floor(Math.random() * 10).toString();
  }
  try {
    const user = await UserModel.findOneAndUpdate(
      email,
      { $set: { otp: newotp } },
      { new: true }
    );
    const mailOptions = {
      from: "bikikutta25@gmail.com",
      to: email.email,
      subject: "OTP-Verification",
      text: `Please use the code below to confirm your email address. This code will expire in 2 hours. If you don't think you should be receiving this email, you can safely ignore it. 
      ${newotp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    if (user) {
      res.status(200).send({ message: "Otp Success" });
    } else {
      res.status(404).send({ message: "No existing admin found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "OTP generation failed" });
  }
}

async function otpValidation(req, res) {
  const { email, otp } = req.body;
  console.log(email);
  console.log(otp);
  try {
    const user = await UserModel.findOne({ email: email, otp: otp });
    if (user) {
      console.log("Validation Success");
      res.status(202).json({ success: true });
    } else {
      console.log("Validation Failed");
      res.status(401).json("Invalid OTP");
    }
  } catch (error) {
    console.error(error);
    res
      .status(502)
      .send({ message: "OTP validation failed, Internal server error" });
  }
}

async function resetPassword(req, res) {
  const { email, password } = req.body;
  const user = await UserModel.findOneAndUpdate(
    { email: email },
    { $set: { password: password } },
    { new: true }
  );
  if (user) {
    res.status(201).send({ message: "Password reseted" });
  } else {
    res.status(502).send("password reset process failed");
  }
}

async function countTotalQueries(req, res) {
  const { senderEmail } = req.body;
  try {
    const allQuery = await VlogModel.find({ senderEmail: senderEmail });
    const lengthAllQuery = allQuery.length;
    res.status(200).json(lengthAllQuery);
  } catch (error) {
    console.log("failed count number of Query", error);
  }
}

async function countTotalPosts(req, res) {
  try {
    const allPost = await VlogModel.find({});
    const lengthAllPosts = allPost.length;
    res.status(200).json(lengthAllPosts);
  } catch (error) {
    console.log("failed count number of posts", error);
  }
}

async function countTotalComments(req, res) {
  const { authorEmail } = req.body;
  let totalComments = 0;

  try {
    const result = await VlogModel.find({
      authorEmail: { $exists: true, $ne: [] },
      authorEmail: authorEmail,
    });

    if (result.length > 0) {
      const extractedData = result.map((resultItem) => {
        const descriptions = [];
        const query = [];

        resultItem.authorEmail.forEach((email, index) => {
          if (email === authorEmail) totalComments = totalComments + 1;
        });
      });
    }
    res.status(200).json(totalComments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function deleteQuery(req, res) {
  const {query}=req.body
   try {
     await VlogModel.deleteOne({query:query});
     res.status(201).json("Query successfully deleted ");
   } catch (error) {
     console.log(error);
     res.status(503).json("Failed to delete document");
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
  submitISsues,
  generateOtp,
  otpValidation,
  resetPassword,
  countTotalQueries,
  countTotalPosts,
  countTotalComments,
  deleteQuery
};
