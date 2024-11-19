const User = require("../models/users");
const Product = require('../models/products');


const allProducts= async(req,res)=>{
    const findproducts = await Product.find();
    if(!findproducts){
        return res.status(400).send(error)
    }
    else{
        return res.status(200).send(findproducts)
    }
}
const getoneproduct= async(req,res)=>{
    const {id}=req.params
    try{
    const findproduct = await Product.findOne({_id:id});
    return res.status(200).send(findproduct)
    }
    catch(error){
        return res.status(400).send(error)
    }
}

const getcategory=async(req,res)=>{
    const {category}=req.params
    try{
           const find= await Product.find({category:category})
           res.status(200).send(find)
    }
    catch(error){
        res.status(400).send(error)
    }
}

const cartProducts= async(req,res)=>{
    const {id}=req.params
    const findproducts = await Product.find({_id:id});
    const foundproduct={...findproducts}
    if(!findproducts){
        return res.status(400).send(error)
    }
    else{
        await User.updateOne({"email":req.body.email},{$push:{"cart":{"productName":foundproduct[0].productName,"productId":foundproduct[0].productId,"productPrice":foundproduct[0].productPrice,
    "category":foundproduct[0].category,"productImage":foundproduct[0].productImage,"quantity":foundproduct[0].quantity}}})
        return res.status(200).send(findproducts)
    }
}

module.exports={allProducts, cartProducts, getcategory, getoneproduct}