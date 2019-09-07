var validator = require('express-validator');

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
        return res.status(422).send(response)
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
                return res.status(400).send("Registartion SuccessFull")
            }
        })
    }
}

/**********************************************************************************************/
exports.loginController=(req,res)=>
{
  
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
  
    req.check("email","email should not be null").isEmail();
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
