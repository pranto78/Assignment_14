const RegistrationModel = require('../models/RegistrationModel')
var jwt = require('jsonwebtoken');



exports.CreateRegistration=(req,res)=>{
    let reqBody=req.body;
    RegistrationModel.create(reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"Success",data:data})
        }
    })
}

exports.UserLogin=(req,res)=>{
    let UserName=req.body["UserName"]
    let Password=req.body['Password']
    RegistrationModel.find({UserName:UserName,Password:Password},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            if(data.length>0){
                // Create Auth Token
                let Payload={exp:Math.floor(Date.now()/1000)+(24*60*60),data:data[0]}
                let token = jwt.sign( Payload,'SecretKey12345');


                res.status(200).json({status:"Success",token:token,data:data[0]})
            }
            else {
                res.status(401).json({status:"Unauthorized"})
            }
        }
    })
}

exports.ProfileRead=(req,res)=>{
    let UserName=req.headers['username']
    RegistrationModel.find({UserName:UserName},(err,data)=>{

        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"Success",data:data})
        }
    })
}


exports.UpdateProfile=(req,res)=>{
    let UserName=req.headers['username']
    let reqBody=req.body;
    RegistrationModel.updateOne({UserName:UserName},{$set:reqBody},{upsert:true},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}