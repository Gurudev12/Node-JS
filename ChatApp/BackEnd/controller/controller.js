 
/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon model.js
 * 
 * Purpose          : 
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
    req.check("firstname","first name should not be null").isAlpha()


    req.check("lastname","last name should not be null").notEmpty();
    req.check("lastname","last name should be character").isAlpha();

    req.check("email","email should not be null").isEmail();
    req.check("email","email should not be empty").notEmpty();

    req.check("password","pasword is invalid").isLength({min:6}).notEmpty();
   

    let error=req.validationErrors();

    let response={}

    if(error)
    {
        response.success=false
        response.error=error;
        return res.status(400).send(response)
    }
    else{

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
                return res.status(200).send("Registartion SuccessFull")
            }
        })
    }
}

/**********************************************************************************************/
exports.loginController=(req,res)=>
{
  console.log('i am in contoller')
    req.check("email","email should not be null").isEmail();
    req.check("email","email should not be empty").notEmpty();

    req.check("password","pasword is invalid").isLength({min:6}).notEmpty();
   

    let error=req.validationErrors();
    let response={}

    if(error)
    {
        response.success=false
        response.error=error;
        return res.status(400).send(response)
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
                return res.status(400).send(data)
            }
        })
    }
}
/*Forgot password controller************************************************************************************ */
exports.forgotPasswordController=(req,res)=>
{
  
    req.check("email","email should be in email form").isEmail();
    req.check("email","email should not be empty").notEmpty();

    let error=req.validationErrors();
    let response={}

    if(error)
    {
        response.success=false
        response.error=error;
        return res.status(400).send(response)
    }
    else{

        console.log("forgot_password controller")
        const service=require('../services/services')


        //this method sending forgot password Details to service & also callback
        service.forgotPasswordService(req.body.email,(err,data)=>{
            if(err)
            {
                return res.status(400).send(err)
            }
            else{
                return res.status(400).send(data)
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
        
        return res.status(400).send(response)

    } else {

        service.resetPasswordService(req.id,req.body.password,(err, data) => {
            if (err) {
               
                response.success = false;
                response.error = err;
                
                return res.status(422).send(response)
            } else {
                
                response.success = true;
                response.content = data;
                
                return res.status(200).send(response)
            }
    
        })
        
}
}













       
       






























