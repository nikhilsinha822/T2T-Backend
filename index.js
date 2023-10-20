const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000
const cors = require('cors');
const corsOption = require('./config/corsOption')
require('dotenv').config();
const mongoose = require('mongoose')
const connectDB = require("./config/dbCon")

connectDB();

app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({extended: false}));

mongoose.connection.once("open", ()=>{
    console.log("Connected to mongoDB");
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
})