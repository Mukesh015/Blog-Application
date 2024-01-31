const express = require('express');
const mongoose = require('mongoose');
const StaticRouter = require('./routes/stastic')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Mukesh:Mukesh%402002@learn-mongodb.yxla1ty.mongodb.net/')
    .then(console.log('Database connected'))
    .catch((error)=>{console.error('Database connection failed',error)})

const PORT = 8080;

app.use('/',StaticRouter)

app.listen(PORT,()=>{
    console.log(`Server listening from http://localhost:${PORT}`)
});