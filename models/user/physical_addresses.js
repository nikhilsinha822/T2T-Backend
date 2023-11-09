const mongoose=require("mongoose")
const Schema=mongoose.Schema
const addressSchema=new Schema({
    HouseNumber:{
        type:'String',
        required:true
    },
    City:{
        type:String,
        required:true
    },
    Zipcode:{
        type:Number,
        required:true
    },
    Primary_address:{
        type:Boolean
    }
})

module.exports=mongoose.model('Address',addressSchema)