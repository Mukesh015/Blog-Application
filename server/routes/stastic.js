const express = require('express');
const {newVlogCreate,getBlog,postNewQuery,getAllBlog,addComment,getEmail,register,login,welcome,decodeJWT} = require('../controllers/auth')
const {createAndSendToken,verifyToken} = require('../middlewares/auth')
const StaticRouter = express.Router();

StaticRouter.post('/createblog',newVlogCreate)
StaticRouter.post('/getblog',getBlog)
StaticRouter.post('/postnewquery',postNewQuery)
StaticRouter.post('/getallblog',getAllBlog)
StaticRouter.post('/addcomment',addComment)
StaticRouter.post('/register',register)
StaticRouter.post('/login',login)
StaticRouter.post('/verifyjwt',verifyToken,welcome);
StaticRouter.get('/getuser',decodeJWT);

module.exports = StaticRouter;