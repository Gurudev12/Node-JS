 
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
const service=require('../services/userServices')

class UserController
{
registrationController=(req,res)=>
    {
        try{
    
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
    
            const service=require('../services/userServices')
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
                    response.success=false
                    response.error=error;
                    return res.status(400).send(response)
                }
                else{
                    response.success=true
                    response.data=data
                    response.message="Register successfully"
                    return res.status(200).send(response)
                }
            })
        }
    
        }catch(e)
        {
            console.log(e);
        }
    }
    
    /**********************************************************************************************/
loginController=(req,res)=>
    {
        try{
     
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
            const service=require('../services/userServices')
            let loginDetail={
                email:req.body.email,
                password:req.body.password,
            }
            //this method sending login Details to service & also callback
            service.loginService(loginDetail,(err,data)=>{
                if(err)
                {
                    response.success=false
                    response.error=error;
                    return res.status(400).send(response)
                }
                else{
                    response.success=true;
                    response.message="Login Sucessfully done."
                    response.content=data;
                    return res.status(200).send(response)
                }
            })
        }
        }catch(e)
        {
            console.log(e)
        }
    }
    
    
    /*Forgot password controller************************************************************************************ */
forgotPasswordController=(req,res)=>
    {
        try{
            
        req.check("email","email should not be empty").notEmpty();
        req.check("email","email should be in email form").isEmail();
       
    
        let error=req.validationErrors();
        let response={}
        if(error)
        {
            response.success=false;
            response.error=error;
            return res.status(200).send(response)
        }
        else{
    
            
            const service=require('../services/userServices')
            //this method sending forgot password Details to service & also callback
            service.forgotPasswordService(req.body.email,(err,data)=>{
                if(err)
                {
                    response.success=false;
                    response.error=err; 
                    response.message="Error occured while sending email for forget password"
                    return res.status(400).send(response)
                }
                else{
                    
                    response.success=true;
                    response.message="Sending email successfully done for forget password";
                    response.content=data;
                    return res.status(200).send(response);
                }
            })
        }
        }catch(e)
        {
            console.log(e)
        }
    }
    
resetPassword=(req,res)=>{
    
        try{
            console.log("req data",req.body.password);
            
            req.check("password","password should not be empty").notEmpty();
            req.check('password', 'password should be have length 6 ').isLength({ min: 6 })
            
        
        let error = req.validationErrors();
        let response = {};
    
        if (error) {
            
            response.suceess = false;
            response.error = error
            return res.status(400).send(response)
        } 
        else {
            let resetData={
                password:req.body.password,
                id:req.body.id
            }
            service.resetPasswordService(resetData,(err, data) => {
                if (err) { 
                    response.suceess = false;
                    response.message="Error occured while reset password"
                    response.error = error
                    return res.status(400).send(response)
                } else {
                    response.suceess =true;
                    response.message="Reset password successfully";
                    response.content=data;
                    return res.status(200).send(response)
                }
        
            })
            
        }
        }catch(e)
        {
            console.log(e)
        }
    
    }
    /****************newchanges********************************************/ 
userDataController=(req,res)=>{
    
        try{
        let response= {};
        let error = req.validationErrors()
        if(error)
        {
            response.success = false;
            response.errors = error;
            return res.status(400).send(response)
        }
        else
        {
            service.userDataService((err,data)=>{
                if(err)
                {  
                    response.success = false;
                    response.errors = err;
                    return res.status(400).send(response);
                }
                else{
                    response.success=true;
                    response.message="Successfully we get registered users data"
                    response.content=data
                    return res.status(200).send(response)
                }
            })
        }
        }catch(e)
        {
            console.log(e)
        }
    }
    
}

const userControllerObject=new UserController();
module.exports=userControllerObject