const express = require('express');
const {newVlogCreate,getBlog} = require('../controllers/auth')
const StaticRouter = express.Router();

StaticRouter.post('/createblog',newVlogCreate)
StaticRouter.post('/getblog',getBlog)

module.exports = StaticRouter;