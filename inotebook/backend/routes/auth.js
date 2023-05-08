
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');



//Create a user using : Post "/api/auth/". Dosen't require auth
router.post('/',[
body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5}),
    
] ,   (req, res) => {
const result = validationResult(req);
if (!result.isEmpty()) {
  return res.status(400).json({result: result.array()});
}
User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,

}).then(user => res.json(user))
.catch(err => {console.log(err)
    res.json({error: 'Please enter a unique value for email'})})

});
module.exports = router
