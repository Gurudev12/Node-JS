/*************************************************************************
 * Execution        : 
 * 
 * Purpose          : userController.js is used to handle request and response of client in backend server
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

registrationController(req,res){

        req.checkBody("firstName","first name should not be null").notEmpty()
        req.checkBody("firstName","first name should be valid format").isAlpha()
    
    
        req.checkBody("lastName","last name should not be null").notEmpty();
        req.checkBody("lastName","last name should be valid format").isAlpha();
    
        req.checkBody("email","email should not be empty").notEmpty();
        req.checkBody("email","email should be in valid format").isEmail();
    
        req.checkBody("userType","userType should not be empty").notEmpty()
        req.checkBody("userType","userType should be valid format").isAlpha()

        req.checkBody("password","pasword length must be greater than 6").isLength({min:6})
        req.checkBody("password","pasword should not be empty").notEmpty()
    let error=req.validationErrors();
    let response={};
    /******
     * @description-This error will generate validation error and send status code (422)
     * *** */
    if(error){
        response.success=false;
        response.error=error;
        return res.status(422).send(response)
    }
    else{
        let paramObject={
            "firstName":req.body.firstName,
            "lastName":req.body.lastName,
            "email":req.body.email,
            "userType":req.body.userType,
            "password":req.body.password
        }

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
                return res.status(400).send(response)
            })

    } 

}

/**********************LoginController ****************************************/
loginController=(req,res)=>{
    req.checkBody("email","email should not be empty").notEmpty();
    req.checkBody("email","email should be in valid format").isEmail();

    req.checkBody("password","pasword length must be greater than 6").isLength({min:6});
    req.checkBody("password","password should not be empty").notEmpty();
    let error=req.validationErrors()
    let response={}
    if(error)
    {
        response.success=false,
        response.error=error,
        res.status(422).send(response)
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
        res.status(422).send(response)
    }
    else{
        serviceObject.forgotPasswordService(req.body.email)
        .then(sendinEmailResponse=>{
            response.success=true;
            response.content=sendinEmailResponse;
            res.status(200).send(response)
        })
        .catch(err=>{
            response.success=false;
            response.error=err;
            res.status(400).send(response)
        })
        
    }

}
/**************************************************************/
resetPassword=(req,res)=>{
    req.checkBody("password","pasword should not be empty").notEmpty()
    req.checkBody("password","pasword length must be greater than 6").isLength({min:6});
    let error=req.validationErrors()
    let response={}

    if(error){
        response.success=false;
        response.error=error;
        return res.status(422).send(response)
    }
    else{
        console.log("CONTROLLER ID",req.body.content._id)
        let resetData={
            "id":req.body.content._id,
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