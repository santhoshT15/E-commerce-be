const User = require("../models/users");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Products =require("../models/products");
const Product = require("../models/products");

//registration
const register = async (req, res) => {
    try {
        //check for already exist
        const userExist =await User.findOne({ email: req.body.email});
        if(userExist){
            return res.status(409).send({message: "User email already exists"})
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        console.log(hashedPassword);
        const newUser = new User({
            ...req.body, password: hashedPassword,
        })
        console.log(newUser);
        await newUser.save();
        res.status(200).json("User has been successfully created !!!");
    }catch (error) {
        console.log(error.message)
        res.status(409).send(error.message);
    }
};

//user login
const login = async (req, res) => {

    const { email, password } = req.body;

     try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Invalid email" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expiration (optional)
        );

        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({ 
                user: { 
                    _id: user._id,
                    email: user.email,
                    token: token
                }
            });

        console.log("user logged in successfully");
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }

}; 

const allUsers= async(req,res)=>{
    const findusers = await User.find();
    if(!findusers){
        return res.status(400).send(error)
    }
    else{
        return res.status(200).send(findusers)
    }
}

const deleteUser = async (req, res) => {
    const data =  await User.deleteOne({ _id: req.params.id });
      try {
          res.status(200).send(data)
      }
      catch (error) {
          res.status(400).send(error)
      }
  }

const cart= async(req,res)=>{
    try{
         const find= await User.findOne({"email":req.body.email})
         res.status(200).send(find.cart)

    }
    catch(error){
        res.status(400).send(error)
    }
}  

const deleteCart= async(req,res)=>{
    const {id}=req.params
    try{
        const deleteProduct= await User.updateOne({"email":req.body.email},{$pull:{cart:{_id:id}}})
        res.status(200).send(deleteProduct)
    } 
    catch(error){
            res.status(400).send(error)
    }
}

const updateorders= async(req,res)=>{
    const{email,address,orderid}=req.body
    
    try{
        const find= await User.findOne({"email":email})
        const cartitems=find.cart
        cartitems.map(async (items)=>
        await User.updateOne({"email":email},{$push:{"orderedItem":{"productName": items.productName ,"orderId":orderid,"productId":items.productId,"productPrice":items.productPrice,
        "category":items.category,"productImage":items.productImage,"quantity":items.quantity,"deliveryAddress":address}}})
        )
    
        cartitems.map(async (items)=>
        await User.updateOne({"role":"admin"},{$push:{"orderedList":{"userName":find.name ,"userEmail":find.email,"orderId":orderid ,"productName": items.productName ,"productPrice":items.productPrice,
        "category":items.category,"quantity":items.quantity,"deliveryAddress":address}}})
        )
        res.status(200).send('order placed sucessfull')
    }
    catch(error){
        res.status(400).send(error)
    }
}

const order= async(req,res)=>{
    const{email}=req.body
    try{
          const find= await User.findOne({"email":email})
        
          res.status(200).send(find.orderedItem)
    }
    catch(error){
        res.status(400).send(error)
    }
}

const postreview= async(req,res)=>{
    const{id}=req.params;
    try{
       await Product.updateOne({_id:id},{$push:{"review":{"userName":req.body.userName,"rating":req.body.rating,"reviewTitle":req.body.reviewTitle,"review":req.body.review}}})
        const find= await Product.findOne({_id:id})
        const totalrating= find.review.map(item=>item.rating)
        const final=(Math.round((totalrating.reduce((a,b)=>a+b)/totalrating.length)*10)/10).toFixed(1)
        await Product.updateOne({_id:id},{$set:{"rating":final}})
         res.status(200).send({messsage:"Review added sucessfully"})
    }
    catch(error){
         res.status(400).send(error)
    }                                                                                                                                                                                                                                                                                                       
}

const getreview= async(req,res)=>{
    const {id}= req.params;
    try{
         const find= await Product.findOne({_id:id});
         res.status(200).send(find.review)
    }
    catch(error){
         res.status(400).send(error)
    }
}

module.exports = {getreview, postreview, order,
    updateorders, cart, deleteCart, register, login, allUsers,
    deleteUser
}