const mongoose=require("mongoose")
const Schema=mongoose.Schema

const shippingSchema=new Schema({
    target_address:{
        type:Schema.Types.ObjectId,
        ref:'Address',
        required:true
    },
    order_id:{
        type:Schema.Types.ObjectId,
        ref:'Order',
        required:true
    },
    status:{
        type:String,
        enum:['Dispatched','Not Dispatched','Delivered','Not Delivered'],
        required:true
    },
    cost:{
        type:Number,

    }
})

module.exports=mongoose.model('Shipping',shippingSchema)