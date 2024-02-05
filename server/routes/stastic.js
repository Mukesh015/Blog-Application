const express = require('express');
const {newVlogCreate,getBlog,postNewQuery,getAllBlog,addComment,getEmail,register,login} = require('../controllers/auth')
const StaticRouter = express.Router();

StaticRouter.post('/createblog',newVlogCreate)
StaticRouter.post('/getblog',getBlog)
StaticRouter.post('/postnewquery',postNewQuery)
StaticRouter.post('/getallblog',getAllBlog)
StaticRouter.post('/addcomment',addComment)
StaticRouter.post('/getEmail',getEmail)
StaticRouter.post('/register',register)
StaticRouter.post('/login',login)


module.exports = StaticRouter;