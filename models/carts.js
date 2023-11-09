const mongoose=require("mongoose")
const Schema=mongoose.Schema

const cartSchema=new Schema({
    quantity:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
    },
    total:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    product_id:{
        type:[Schema.Types.ObjectId],
        ref:'Product',
        required:true
    }
},{timestamps:true})