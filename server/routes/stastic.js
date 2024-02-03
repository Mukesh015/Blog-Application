const express = require('express');
const {newVlogCreate,getBlog,postNewQuery,getAllBlog,addComment} = require('../controllers/auth')
const StaticRouter = express.Router();

StaticRouter.post('/createblog',newVlogCreate)
StaticRouter.post('/getblog',getBlog)
StaticRouter.post('/postnewquery',postNewQuery)
StaticRouter.post('/getallblog',getAllBlog)
StaticRouter.post('/addcomment',addComment)


module.exports = StaticRouter;