const express = require('express');
const router = express.Router();
const { registerValidation } = require('../Controllers/validation');
const User = require('../Models/model');

router.post('/signup', async(req,res) => {
    
    const existingEmail = await User.findOne({email:req.body.email});
    if(existingEmail){
        res.status(400).json({message:"This Email already exist"});
    }

    const user = new User(req.body);
    if(user){
        res.status(201).send(user);
    }else{
        res.status(400).json({message:"Cant save the user"});
    }
});

module.exports = router;