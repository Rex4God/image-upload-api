const express = require('express')
const router =express.Router()
const cloudinary = require('../middleware/cloudinary')
const upload = require('../middleware/upload')
const  User  = require('../models/userSchema')
const path = require('path')


router.post('/',upload.single('image'), async(req,res)=>{
    try{
       const result = await cloudinary.uploader.upload(req.file.path)
       
    // Create User Instance
    const  user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: result.secure_url,
        cloudinary_id: result.public_id,
    });
    //save user instance
    await user.save();
    res.json(user);

    }catch(err){
     console.log(err)
    }
})
// Get All User Route
router.get('/',async(req,res)=>{
    try{
     const user = await User.find({});
     res.json(user)
    }catch(error){
    console.log('Failure to get the user')
    }
});
router.get('/:id',async(req,res)=>{
    try{
        //get user by ID
    const user = await User.findById(req.params.id);
    res.json(user)
    }catch(error){
    console.log('Failure to get a single user')
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        //get user by ID
    const user = await User.findById(req.params.id);
    //Deleting image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id)
    //Deleting user from DB
    await  user.remove();
    res.json(user)
    }catch(error){
    console.log('Failure to delete the user')
    }
})
router.put('/:id',upload.single('image'),async(req,res)=>{
  try{
    let user = await User.findById(req.params.id);

    await cloudinary.uploader.upload(user.cloudinary_id);

    const result = await cloudinary.uploader.upload(req.file.path);
    const data ={
        name: req.body.name || user.name,
        email: req.body.email || user.email,
        password: req.body.password || user.password,
        image: result.secure_url||user.image,
        cloudinary_id: result.public_id||user.cloudinary_id,
    };
    user = await User.findByIdAndUpdate(req.params.id,data,{
        new: true,
    });
    res.json(user)

  } catch(error) {
      console.log(error)
  } 

} )







module.exports =router;