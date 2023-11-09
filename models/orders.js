const mongoose=require("mongoose")
const Schema=mongoose.Schema
const orderSchema=({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    tax:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    paid:{
        type:Boolean,
        required:true
    },
    cart_id:{
        type:Schema.Types.ObjectId,
        ref:'Cart',
        required:true
    },
    shipping_id:{
        type:Schema.Types.ObjectId,
        ref:'Shipping',
        required:true
    }
})

module.exports=mongoose.model('Order',orderSchema)