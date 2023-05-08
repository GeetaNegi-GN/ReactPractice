
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'myraandvani';
var jwt = require('jsonwebtoken')

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
    res.status(500).send("some error occured");
}
});
module.exports = router
