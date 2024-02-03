const express = require('express')
const router = express.Router()
const {User,validate} = require('../models/user')
const encryptpwd = require('encrypt-with-password');
const jwt  = require('jsonwebtoken')


router.post("/", async (req,res)=>{
  try{
    const {error} = validate(req.body);
    if(error)
    return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({email : req.body.email})
    if(user){
      return res.status(409).send("User with given email already exist")
    }
    const hashedPassword = encryptpwd.encrypt(req.body.password, process.env.CYPHER_KEY);
    
    
    await new User({...req.body,password: hashedPassword}).save();
    res.status(201).send("User created successfully");
  }catch(error){
    console.log(error)
     res.status(500).send("Internal server error.")
  }
  
})

router.get("/get-data", async (req,res)=>{
  try{
    const token = req.headers.authorization.split(' ')[1];
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    
    const user = await User.findOne({email : decoded.email})
    // console.log(user)
    if(!user){
      return res.status(404).send("User not found!")
    }
    // Decrypt
    // console.log(user.password,process.env.CYPHER_KEY)
    const decrypted = encryptpwd.decrypt(user.password, process.env.CYPHER_KEY)
    
    res.status(200).send({...user,password:decrypted})
  }catch(error){
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

router.post("/update", async (req,res)=>{
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    const hashedPassword = encryptpwd.encrypt(req.body.password, process.env.CYPHER_KEY);
    
    
    const data={...req.body,password: hashedPassword};
    const user = await User.findOneAndUpdate({email:decoded.email}, data, {
      new: true
    });
    
    res.status(200).send(user);
  }catch(error){
    console.log(error)
     res.status(500).send("Internal server error.")
  }
  
})

router.delete("/delete", async (req,res)=>{
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    const user = await User.findOne({email : decoded.email})
    // console.log(user)
    if(!user){
      return res.status(404).send("User not found!")
    }
    await User.deleteOne({ email:decoded.email });
    

    res.status(200).send("Account deleted Successfully");
  }catch(error){
    console.log(error)
     res.status(500).send("Internal server error.")
  }
  
})

module.exports = router;