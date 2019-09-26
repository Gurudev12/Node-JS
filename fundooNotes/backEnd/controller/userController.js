/*************************************************************************
 * Execution        : 
 * 
 * Purpose          : 
 *                    
 *                     
 *                    
 * 
 * @file            : userController.js
 * @author          : Gurudev Murkar
 * @version         : 1.0
 * @since           : 25-9-2019
 * 
 **************************************************************************/
let validator=require('express-validator')
let service=require('../service/userService')
let serviceObject=new service.UserService()

class UserController
{
/*****************************registrationController **************/
registrationController(req,res){

        req.checkBody("firstName","first name should not be null").notEmpty()
        req.checkBody("firstName","first name should be valid format").isAlpha()
    
    
        req.checkBody("lastName","last name should not be null").notEmpty();
        req.checkBody("lastName","last name should be valid format").isAlpha();
    
        req.checkBody("email","email should not be empty").notEmpty();
        req.checkBody("email","email should be in valid format").isEmail();
    
        req.checkBody("loginType","loginType should not be empty").notEmpty()
        req.checkBody("loginType","loginType should be valid format").isAlpha()

        req.checkBody("password","pasword length must be greater than 6").isLength({min:6}).notEmpty();

    let error=req.validationErrors();
    let response={};

    if(error){
        response.success=false;
        response.error=error;
        return res.status(400).send(response)
    }
    else{
        let paramObject={
            "firstName":req.body.firstName,
            "lastName":req.body.lastName,
            "email":req.body.email,
            "loginType":req.body.loginType,
            "password":req.body.password
        } //paramObject closed

        // service.registrationService(paramObject)
        serviceObject.registrationService(paramObject)
            .then(data=>{
                response.success=true;
                response.message="Register Successfully";
                response.content=data;
                return res.status(200).send(response)
            })
            .catch(err=>{
                response.success=false;
                response.error=err;
                response.message="Allready crediantial is register";
                return res.status(400).send(response)
            })

    } //else closed

}//registration closed

/**********************LoginController ****************************************/
loginController=(req,res)=>{
    req.checkBody("email","email should not be empty").notEmpty();
    req.checkBody("email","email should be in valid format").isEmail();

    req.checkBody("password","pasword length must be greater than 6").isLength({min:6}).notEmpty();

    let error=req.validationErrors()
    let response={}
    if(error)
    {
        response.success=false,
        response.error=error,
        res.status(400).send(response)
    }
    else{
        let loginDetail={
            "email":req.body.email,
            "password":req.body.password
        }
        serviceObject.loginService(loginDetail)
        .then(data=>{
            response.success=true;
            response.message="Login Successfull.....!!!";
            response.content=data;
            res.status(200).send(response)

        })
        .catch(err=>{
            response.success=false,
            response.error=error,
            response.message="EMAIL OR PASSWORD INCORRECT"
            res.status(400).send(response)
            
        })

    }
}
/**********************Forget Password Controller ****************************************/
forgotController=(req,res)=>{
    req.check("email","email should not be empty").notEmpty();
    req.check("email","email should be in email form").isEmail();
    let error=req.validationErrors()
    let response={};

    if(error)
    {
        response.error=error;
        response.success=false;
        res.status(400).send(response)
    }
    else{
        serviceObject.forgotPasswordService(req.body.email)
        .then(sendinEmailResponce=>{
            response.success=true;
            response.content=sendinEmailResponce;
            res.status(200).send(response)
        })
        .catch(err=>{
            response.success=false;
            response.error=err;
            response.message="ERROR WHILE SENDING MAIL"
        })
        
    }

}
/**************************************************************/
resetPassword=(req,res)=>{
    req.checkBody("password","pasword length must be greater than 6").isLength({min:6}).notEmpty();
    let error=req.validationErrors()
    let response={}

    if(error){
        response.success=false;
        response.error=error;
        return res.status(400).send(response)
    }
    else{
       
        let resetData={
            "id":req.body.content.id,
            "password":req.body.password
        }
        serviceObject.resetService(resetData)
        .then(resetDataResponse=>{
            response.success=true;
            response.message=resetDataResponse;
            res.status(200).send(response)
        })
        .catch(err=>{
            response.success=false;
            response.error=err;
            res.status(400).send(response)
        })
    }
    

}

} //class close
let UserControllerObject=new UserController()
module.exports=UserControllerObject