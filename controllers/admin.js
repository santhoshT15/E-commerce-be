const Product = require('../models/products');
const User = require('../models/users');


//creating product 
const createProduct = async (req, res) => {
    const find= await Product.find()
    
    const products = new Product({
        productName: req.body.productName,
        category: req.body.category,
        productPrice: req.body.productPrice,
        productImage:req.body.productImage,
        description:req.body.description,
        productId: "#00"+ (find.length+1),
    })
    try {
       
       await products.save();
        res.status(200).send("Product created sucessfully")
    }
    catch (error) {
        res.status(200).send("error")
    }
}

//deleting product
const deleteProduct = async (req, res) => {
  const data =  await Product.deleteOne({ _id: req.params.id });
    try {
        res.status(200).send(data)
    }
    catch (error) {
        res.status(400).send(error)
    }
}

//updating the product
const updateProduct = async (req, res) => {
  const products=  await Product.findOne({_id: req.params.id })

    await products.updateOne({ productName: req.body.productName,
        category: req.body.category,
        productPrice: req.body.productPrice, productImage:req.body.productImage,description:req.body.description})
    
    try {
        res.status(200).send("Updated  sucessfully")
    }
    catch (error) {
        res.status(400).send(error)
    }
}

const getUsers=async(req,res)=>{
    try{
        const find= await User.findOne({"role":"admin"})
        res.status(200).send(find.orderedList)

    }
    catch(error){
        res.status(400).send(error)
    }
}

const updatestatus= async(req,res)=>{
    const{id,status}=req.body;
    
    try{
       const find= await User.findOne({"role":"admin"})
          await User.updateOne({"orderedItem.orderId":id},{$set:{"orderedItem.$.status":status}})
          await User.updateOne({"orderedList.orderId":id},{$set:{"orderedList.$.status":status}})
          res.status(200).send({data:find.rentedUser,message:"Update sucessfull"})
    }
    catch(error){
        res.status(400).send(error)
    }

}

module.exports.updatestatus=updatestatus;
module.exports.getUsers=getUsers;
module.exports.createProduct = createProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct=updateProduct;