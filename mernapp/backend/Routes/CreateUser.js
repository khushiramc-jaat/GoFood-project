const express = require('express')
const router=express.Router();
const { body,validationResult } =require('express-validator');

const bcrypt= require("bcryptjs")

const User = require('../models/User')
const jwt= require("jsonwebtoken")
const jwtsecret="MykhyshEnshteyhndbroiethgsfervxfe"

router.post("/creatuser",[
body("email").isEmail(),
body('name').isLength({min:5}),
body('password','incorrect password').isLength({min:5})]
,async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const salt=await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);

    try{
        //await User.create(req.body);
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPassword,
            location:req.body.location
        })
        res.json({success:true})
    }catch(error){
        console.log("error");
        res.json({success:false})
    }
})

router.post("/loginuser" ,[
    body("email").isEmail(),
    body('password','incorrect password').isLength({min:5})],async(req,res)=>{
        const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    let email=req.body.email;
        try{

            let userdata= await User.findOne({email});
            if(!userdata){
                return res.status(400).json({error:"Try logging with correct credentails"})
            }
            const pwdCompare = await bcrypt.compare(req.body.password,userdata.password)
            if(!pwdCompare){
                return res.status(400).json({error:"Try logging with correct credentails"})
            }

            const data={
                user:{
                    id:userdata._id
                }
            }

            const authToken=jwt.sign(data,jwtsecret)

            return  res.send({success:true,authToken:authToken})

        }catch(error){
            console.log("error");
            res.json({success:false})
        }
    })

module.exports=router;