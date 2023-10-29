const{ VproductSchema, VproductTypeSchema }=require("./validations")

const product=require('../../models/product/product')
const product_type=require('../../models/product/products_types')
const Joi=require('joi')
const Boom=require('boom')


module.exports.Create=async(req,res,next)=>{
    const input1=req.body
    const input2=req.body.product_types
    const{error1}=VproductSchema.validate(input1)
    const{error2}=VproductTypeSchema.validate(input2)
    if(error1){
        return next(Boom.badRequest(error1.details[0].message))
    }
    else if(error2) next(Boom.badRequest(error2.details[0].message))
    try{
        
        const prodType=new product_type(input1.product_types)
        await prodType.save()
        const prod = new product(input1);
        prod.product_types=prodType
        const savedData = await prod.save();
        // input1.product_types.images=JSON.parse(input1.product_types.images)
        
        
        res.status(200).json({message:'Created Successfully',savedData})
    }catch(e){
        next(e)
    }
};
module.exports.Get = async (req, res, next) => {
  const { id,productTypeId } = req.params;

  if (!id || !productTypeId) {
    return next(Boom.badRequest("Missing parameter (:product_id)"));
  }

  try {
    const prod = await product.findById(id).populate('product_types');
    // const prodType=await product_type.findById(productTypeId)
    // prod.product_types.push(prodType)
    res.json(prod)
   
    
   }catch(e){
        next(e)
       console.log(e);
    }
    
    // if(!prodType){
    //     return res.status(404).json({message:'Product Type Not Found'})
    // }
    // return res.status(200).json({prod})
};

module.exports.Update=async(req,res,next)=>{
    const{id,productTypeId}=req.params
    const{title,category,channel,region}=req.body
    
    try{
        const UpdateProdType=await product_type.findByIdAndUpdate(productTypeId,req.body.product_types,{
            new:true
        })
        if(!UpdateProdType){
        return res.status(404).json({message:'Product_Type Table could not be Updated'})
        }
        const UpdateProduct=await product.findByIdAndUpdate(id,{title,category,channel,region},{
            new:true
        })
        if(!UpdateProduct){
        return res.status(404).json({message:'Product_Type Table could not be Updated'})
        }
        
        res.status(200).json({message:'Updated Successfully',UpdateProduct})

    }catch(e){
        next(e)
       return console.log(e);
    }
   
    
}
module.exports.Delete=async(req,res,next)=>{
    const{id,productTypeId}=req.params
    
    try{
        const deleteProductType=await product_type.findByIdAndDelete(productTypeId)
        if (!deleteProductType) {
            throw Boom.badRequest("Product not found.");
        }
        const deleteProd=await product.findByIdAndDelete(id)
         if (!deleteProd) {
            throw Boom.badRequest("Product not found.");
        }
        res.status(200).json({message:'Deleted Successfully'})
    }catch(e){
        next(e)
        console.log(e);
    }
   
}

const limit = 12;
module.exports.GetList = async (req, res, next) => {
  let { page } = req.query;

  if (page < 1) {
    page = 1;
  }

  const skip = (parseInt(page) - 1) * limit;

  try {
    const prod = await product.find({}).populate('product_types')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(prod);
  } catch (e) {
    next(e);
  }
};

