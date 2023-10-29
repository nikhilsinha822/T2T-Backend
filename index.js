const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000
const cors = require('cors');
const corsOption = require('./config/corsOption')
const Router = require('./routes/productRoutes');
require('dotenv').config();
const mongoose = require('mongoose')
const connectDB = require("./config/dbCon")

connectDB();

app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({extended: false}));


app.use('/api',Router)

mongoose.connection.once("open", ()=>{
    console.log("Connected to mongoDB");
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
})
// require('dotenv').config();
// const dbUrl=process.env.DATABASE_URI
// const express=require('express')
// const mongoose = require('mongoose');
// const Router = require('./routes/productRoutes');


// const app=express()
// app.use(express.json())

// 
// app.use(express.urlencoded({extended:true}))
// mongoose.connect(dbUrl,{ useNewUrlParser: true,  useUnifiedTopology: true})
//     .then(()=>app.listen(5000))
//     .then(()=>console.log('LISTENING AT PORT 5000'))
//     .catch((err)=>console.log('ERROR',err))
    