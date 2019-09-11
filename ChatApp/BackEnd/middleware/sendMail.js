var nodemailer=require('nodemailer')
module.exports={
sendMail(userEmail,newToken,callback)
{
var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'gurumurkar@gmail.com',
        pass:'gurudev123'
    }
});

var mailOption={
    from:'gurumurkar@gmail.com',
    to:userEmail,
    subject:'sending mail using node js',
    text:'Reset password',
    // following href is url of the state(url:)
    html:'<p>this is link to reset</p><a href="http://localhost:4000/#/resetPassword'+newToken+'">Reset PassWord</a>'
    }
transporter.sendMail(mailOption,function(err,info){
    if(err)
    {
        callback(err)
    }
    else{
        callback(null,"Email sent");
    }
})
}
}