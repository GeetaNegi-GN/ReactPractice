
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'myraandvani';
//Create a user using : Post "/api/auth/createuser". No login required
router.post('/createuser',[
body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5}),
    
] ,  async (req, res) => {
//If there are errors ,return Bad request and the errors
const result = validationResult(req);
if (!result.isEmpty()) {
  return res.status(400).json({result: result.array()});
}
try{
//check whether the user with this email exists already
let user = await User.findOne({email: req.body.email});
if (user){
    return res.status(400).json({error:"Sorry a user with this email already exists"})
}

const salt =await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password,salt);

 user = await User.create({
    name: req.body.name,
    password: secPass,
    email: req.body.email,

});
const data = {
    user:{
        id: user.id
    }
}
const authtoken = jwt.sign(data,JWT_SECRET);

 res.json({authtoken})

}catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}
});

//authenticate a user: Post "/api/auth/login".no login required
router.post('/login',[
  
        body('email','Enter a valid email').isEmail(),
        body('password','Password cannot be blank').exists(),
       

           
] ,  async (req, res) => {
//If there are errors ,return Bad request and the errors
const result = validationResult(req);
if (!result.isEmpty()) {
  return res.status(400).json({result: result.array()});
}

const {email,password}= req.body;
try{
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({error: "Please try to login with correct credentials"});

    }
    const passwordCompare =await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(400).json({error: "Please try to login with correct credentials"});
    }
    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    
     res.json({authtoken})

}

catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}

})

//Get loggedin user details using: Post "/api/auth/getuser".login required
router.post('/getuser',fetchuser, async (req, res) => {
try{
userId = req.user.id;
const user = await User.findById(userId).select("-password")
res.send(user)
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");

}
    })
module.exports = router
