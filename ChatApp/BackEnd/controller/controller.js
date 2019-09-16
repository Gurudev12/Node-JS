 
/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon model.js
 * 
 * Purpose          : contoller check the client request and if there is error
 *                    then print error otherwise goto services.
 *                    
 *                     
 *                    
 * 
 * @file            : contoller.js
 * @author          : Gurudev Murkar
 * @version         : 1.0
 * @since           : 06-09-2019
 * 
 **************************************************************************/
var validator = require('express-validator');
const service=require('../services/services')

exports.registrationController=(req,res)=>
{
    req.check("firstname","first name should not be null").notEmpty()
    req.check("firstname","first name should be valid format").isAlpha()


    req.check("lastname","last name should not be null").notEmpty();
    req.check("lastname","last name should be valid format").isAlpha();

    req.check("email","email should not be empty").notEmpty();
    req.check("email","email should be in valid format").isEmail();


    req.check("password","pasword is invalid").isLength({min:6}).notEmpty();
   

    let error=req.validationErrors();
    console.log("----->",error);
    
    let response={}

    if(error)
    {
        response.success=false
        response.error=error;
        return res.status(200).send(response)
    }
    else{
        console.log("i m in controller...")

        const service=require('../services/services')
        let userDetail={
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password,
        }

        //this method sending userDetails to service & also callback
        service.registrationService(userDetail,(err,data)=>{
            if(err)
            {
                return res.status(400).send(err)
            }
            else{
                response.success=true
                response.data=data
                return res.status(200).send(response)
            }
        })
    }
}

/**********************************************************************************************/
exports.loginController=(req,res)=>
{
    console.log(req.body.email)
 
  req.checkBody("email","email should not be empty").notEmpty();
    req.checkBody("email","email should not be null").isEmail();
  
    req.checkBody("password","password is invalid").isLength({min:6}).notEmpty();
   

    let error=req.validationErrors();
    let response={}

    if(error)
    {
        response.success=false
        response.error=error;
        return res.status(200).send(response)
    }
    else{
        const service=require('../services/services')
        let loginDetail={
            email:req.body.email,
            password:req.body.password,
        }
        //this method sending login Details to service & also callback
        service.loginService(loginDetail,(err,data)=>{
            if(err)
            {
                return res.status(400).send(err)
            }
            else{
                console.log(data)
                return res.status(200).send(data)
            }
        })
    }
}
/*Forgot password controller************************************************************************************ */
exports.forgotPasswordController=(req,res)=>
{
    req.check("email","email should not be empty").notEmpty();
    req.check("email","email should be in email form").isEmail();
   

    let error=req.validationErrors();
    let response={}
    if(error)
    {
        response.success=false
        response.error=error;
        return res.status(200).send(response)
    }
    else{

        
        const service=require('../services/services')
        //this method sending forgot password Details to service & also callback
        service.forgotPasswordService(req.body.email,(err,data)=>{
            if(err)
            {
                return res.status(400).send(err)
            }
            else{
                console.log("forgot_password controller")
                response.success=true
                response.data=data
                return res.status(200).send(response)
            }
        })
    }
}

exports.resetPassword=(req,res)=>{
        console.log("req data",req.body.password);
        
        req.check('password', 'password should be have length 6 ').isLength({ min: 6 })
        req.check('password', 'password should be have max length 12').isLength({ max: 12})
    
    let error = req.validationErrors();
    let response = {};

    if (error) {
        
        response.suceess = false;
        response.error = error
        return res.status(400).send(error)
    } 
    else {
        let resetData={
            password:req.body.password,
            id:req.body.id
        }
        service.resetPasswordService(resetData,(err, data) => {
            if (err) { 
                return res.status(400).send(err)
            } else {
                return res.status(200).send(data)
            }
    
        })
        
}
}
/****************newchanges********************************************/ 
exports.userDataController=(req,res)=>{
    let responseResult = {};
 
    let error = req.validationErrors()
    if(error)
    {
        return res.status(400).send(error)
    }
    else
    {
        
        service.userDataService((err,data)=>{
            if(err)
            {  
                responseResult.success = false;
                responseResult.errors = err;
                return res.status(400).send(responseResult);s
            }
            else{
                return res.status(200).send(data)
            }
        })
    }
}








       
       






























