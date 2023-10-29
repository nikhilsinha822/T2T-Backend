const mongoose = require('mongoose')
const ProductType=require('./products_types');
const Schema = mongoose.Schema;
const schemaOptions = {
  timestamps: { created: 'created_at'},
};

const productSchema = new Schema({

    product_types:
        {
            type:Schema.Types.ObjectId,
            ref:'ProductType'
        }
    ,
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
  
    channel:{
        type:[String]
    },
    region:{
        State:{
            type:String,
            required:true
        },
        City:{
            type:String,
            required:true
        }
    }
}, schemaOptions)

module.exports = mongoose.model('Product', productSchema)