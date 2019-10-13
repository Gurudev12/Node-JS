/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon model.js
 * 
 * Purpose          : Sending mail to that person who want to forget password
 *                    
 *                     
 *                    
 * 
 * @file            : sendMail.js
 * @author          : Gurudev Murkar
 * @version         : 1.0
 * @since           : 07-09-2019
 * 
 **************************************************************************/
var nodemailer=require("nodemailer");
const config=require("../config/config");
class EmailSender
{
sendMail(userEmail,apiLink,text,callback)
{
var transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:config.userEmail,
        pass:config.userPassword
    }
});

var mailOption={
    from:config.userEmail,
    to:userEmail,
    subject:"sending mail using node js",
    text:text,
    // following href is url of the state(url:)
    html:apiLink
    };
transporter.sendMail(mailOption,function(err,info){
    if(err)
    {
        callback(err);
    }
    else{
        callback(null,"mail sent"+info);
    }
});
}
}
let EmailSenderObject=new EmailSender();
module.exports=EmailSenderObject;