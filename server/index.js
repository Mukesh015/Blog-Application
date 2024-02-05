const express = require('express');
const mongoose = require('mongoose');
const StaticRouter = require('./routes/stastic')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const DB = process.env.db;
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(DB)
    .then(console.log('Database connected'))
    .catch((error)=>{console.error('Database connection failed',error)})


app.use('/',StaticRouter)

app.listen(PORT,()=>{
    console.log(`Server listening from http://localhost:${PORT}`)
});