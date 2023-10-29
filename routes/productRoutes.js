const express=require('express');
const products= require('../controllers/products/productControllers');



const Router=express.Router()

Router.get('/products',products.GetList)
Router.get("/products/:id/:productTypeId",products.Get);

Router.post("/products",products.Create)


Router.put("/products/:id/:productTypeId",products.Update)
Router.delete("/products/:id/:productTypeId",products.Delete)
module.exports=Router