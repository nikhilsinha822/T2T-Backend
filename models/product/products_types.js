const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const schemaOptions = {
  timestamps: { created: 'created_at',updated:'updated_at'},
};


const productTypesSchema = new Schema({
    
    available:{
        type:Boolean,
        default:false,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    price:{
        original:{
        type:Number,
        required:true,
        default:0.0
        },
        discount:{
            type:Number
        },
        bulk_count:{
            type:Number
        },
        discount_quantity:{
            type:Number
        },
        currency:{
            type:String
        }
    },
    description:{
        type:String,
        required:true
    },
    dimensions:{
        width:{
        type:Number
        },
        height:{
            type:Number
        },
        length:{
            type:Number
        },
        unit:{
            type:String
        },
        
    },
    images:{
        type:[String],
        required:true
    }
},schemaOptions)

module.exports = mongoose.model('ProductType',productTypesSchema)