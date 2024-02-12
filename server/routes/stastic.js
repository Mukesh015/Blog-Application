const express = require("express");
const multer = require('multer');




const {
  newVlogCreate,
  getBlog,
  postNewQuery,
  getAllBlog,
  addComment,
  getEmail,
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
} = require("../controllers/auth");
const { createAndSendToken, verifyToken } = require("../middlewares/auth");
const StaticRouter = express.Router();
const storage = multer.diskStorage({});
const upload = multer({ storage });


StaticRouter.post("/createblog", newVlogCreate);
StaticRouter.post("/getblog", getBlog);
StaticRouter.post("/postnewquery", postNewQuery);
StaticRouter.post("/getallblog", getAllBlog);
StaticRouter.post("/addcomment", addComment);
StaticRouter.post("/register",upload.single('avatar'), register);
StaticRouter.post("/login", login);
StaticRouter.post("/verifyjwt", verifyToken, welcome);
StaticRouter.post("/getuser", decodeJWT);
StaticRouter.post("/getcomments", getComments);
StaticRouter.post("/getposts", getPosts);
StaticRouter.post("/getinboxes", getInboxes);
StaticRouter.post("/getpopularblog", getPopularBlog);
StaticRouter.post("/getallquery", getAllquery);
StaticRouter.post("/getsolvequery", getSolvequery);
StaticRouter.post("/submitfeedback", submitFeedback);
StaticRouter.post("/submitissues", submitISsues);
StaticRouter.post("/generateotp", generateOtp);
StaticRouter.post("/otpvalidation", otpValidation);
StaticRouter.post("/resetpassword", resetPassword);
StaticRouter.post("/counttotalquery", countTotalQueries);
StaticRouter.post("/counttotalposts", countTotalPosts);
StaticRouter.post("/counttotalcomments",   countTotalComments);
StaticRouter.post("/deletequery",deleteQuery);






module.exports = StaticRouter;