/***************************************************************************
 * @Execution        : 1. default node       cmd> nodemon model.js
 * 
 * @Purpose          : userController.js is used to handle request and response of client in backend server
 *                                 
 * 
 * @file            : userController.js
 * @author          : Gurudev Murkar
 * @version         : 1.0
 * @since           : 25-9-2019
 * 
 * @statusCode      :500 Internal Server Error:
 *                       The request was not completed.The server met an unexpected condition.
 *                   400 Bad Request :
 *                       The server did not understand the request.
 *                   201 Created :
 *                       The request is complete, and a new resource is created
 *                   422 Unprocessable Entity (WebDAV) :
 *                       The request was well-formed but was unable to be followed due to semantic errors.
 * 
 * 
 ***************************************************************************/
const service=require("../service/user");
const serviceObject=new service.UserService();

const config=require("../config/config");
const s3=require("../service/s3");
class UserController
{
registration(req,res){

    try{
        req.checkBody("firstName","first name should not be null").notEmpty();
        req.checkBody("firstName","first name should be valid format").isAlpha();
    
    
        req.checkBody("lastName","last name should not be null").notEmpty();
        req.checkBody("lastName","last name should be valid format").isAlpha();
    
        req.checkBody("email","email should not be empty").notEmpty();
        req.checkBody("email","email should be in valid format").isEmail();
    
        // req.checkBody("userType","userType should not be empty").notEmpty();
        // req.checkBody("userType","userType should be valid format").isAlpha();

        req.checkBody("password","pasword should not be empty").notEmpty();
        req.checkBody("password","pasword length must be greater than 6").isLength({min:6});
   
    let error=req.validationErrors();
    let response={};
    /******
     * @description-This error will generate validation error and send status code (422)
     * *** */
    if(error){
        response.success=false;
        response.error=error;
        return res.status(422).send(response);
    }
    else{
        let paramObject={
            "firstName":req.body.firstName,
            "lastName":req.body.lastName,
            "email":req.body.email,
            // "userType":req.body.userType,
            "password":req.body.password
        };
        
        serviceObject.registration(paramObject)
            .then(data=>{
                response.success=true;
                response.content=data;
                return res.status(200).send(response);
            })
            .catch(err=>{
                if(err=="EMAIL IS ALLREADY REGISTER"){
                    response.success=false;
                    response.error=err;
                    return res.status(500).send(response);

                }
                else if(err=="SORRY THIS EMAIL ID IS NOT EXISTED"){
                    
                    response.success=false;
                    response.error=err;
                    return res.status(500).send(response);
                }
      
            });
    } 
    }
    catch(e){
        let response={};
        response.error=e;
        response.message="The server did not understand the request.";
        return res.status(400).send(response);
    }
       

}
/******************************************************* */
verify(req,res){
    
   try{
    let response={};

    serviceObject.verify(req.body._id)
    .then(data=>{
        response.success=true;
        response.content=data;
        res.status(200).send(response);
    })
    .catch(err=>{
        response.success=false;
        response.error=err;
        res.status(500).send(response);

    });
   }
   catch(e){
     let  response={};
    response.error=e;
    response.message="The server did not understand the request.";
    return res.status(400).send(response);
   }
}

/**********************LoginController ****************************************/
login(req,res){
    try{
        req.checkBody("email","email should not be empty").notEmpty();
        req.checkBody("email","email should be in valid format").isEmail();
    
        req.checkBody("password","pasword length must be greater than 6").isLength({min:6});
        req.checkBody("password","password should not be empty").notEmpty();
        let error=req.validationErrors();
        let response={};
        if(error)
        {
            response.success=false;
            response.error=error;
            res.status(422).send(response);
        }
        else{
            let loginDetail={
                "email":req.body.email,
                "password":req.body.password
            };
            serviceObject.login(loginDetail)
            .then(data=>{
                res.status(200).send(data);
    
            })
            .catch(err=>{
                if(err=="WRONG EMAIL ID"){
                    response.success=false;
                    response.error=err;
                    res.status(400).send(response);
                }
                else if(err=="PASSWORD NOT MATCHED"){
                    response.success=false;
                    response.error=err;
                    res.status(400).send(response);
                }
                else if(err=="REGISTRATION VERIFICATION NOT DONE"){
                    response.success=false;
                    response.error=err;
                    res.status(500).send(response);
                }
            });
        }
    }catch(e)
    {
        let response={};
        response.error=e;
        response.message="The server did not understand the request.";
        return res.status(400).send(response);
    }
   
}
/**********************Forget Password Controller ****************************************/
forgotPassword(req,res){
    try{
        req.check("email","email should not be empty").notEmpty();
        req.check("email","email should be in email form").isEmail();
        let error=req.validationErrors();
        let response={};
    
        if(error)
        {
            response.error=error;
            response.success=false;
            res.status(422).send(response);
        }
        else{
            serviceObject.forgotPassword(req.body.email)
            .then(sendinEmailResponse=>{
                response.success=true;
                response.content=sendinEmailResponse;
                res.status(200).send(response);
            })
            .catch(err=>{
                if(err=="EMAL NOT FOUND IN DATABASE")
                {response.success=false;}
                response.error=err;
                res.status(500).send(response);
            });
        }

    }catch(e){
       let response={};
        response.error=e;
        response.message="The server did not understand the request.";
        return res.status(400).send(response);
    }
}

/**RESET PASSWORD WITH ASYNC AWAIT */
async reset(req,res){
    
    req.checkBody("password","pasword should not be empty").notEmpty();
    req.checkBody("password","pasword length must be greater than 6").isLength({min:6});
    let error=req.validationErrors();
    let response={};
    
    if(error){
        response.success=false;
        response.error=error;
        return res.status(422).send(response);
    }
    else{
        let resetData={
            "_id":req.body._id,
            "password":req.body.password
        };
            try{
                let resetResult  =await serviceObject.reset(resetData);
                if(resetResult==true){

                    response.success=true;
                    response.message="PASSWORD UPDATED SUCCESSFULLY";
                    return res.status(200).send(response);

                }else{

                    response.success=false;
                    response.message="ERROR WHILE UPDATING PASSWORD";
                    return res.status(500).send(response);

                }
            }
         
            catch(e){
                response.error=e;
                return res.status(400).send(response);

            }
        }
}
async uploadImage(req,res){

    const s3url = await s3.getSignedUrl("getObject", { Bucket: config.bucket, Key: req.file.originalname });

    let response={};
    
    let uploadData={
        "_id":req.token._id,
        "url":s3url
    };

    let uploadResult =await serviceObject.uploadImage(uploadData);
        if(uploadResult==true){
            response.success=true;
            response.message="Image uploaded successfully";
            return res.status(200).send(response);
        }else{
            response.success=false;
            response.message="Error while image uploading";
            return res.status(400).send(response);
        }
}
}
let userControllerObject=new UserController();
module.exports=userControllerObject;