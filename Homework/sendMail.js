var nodemailer=require('nodemailer')

function mailsend(){
    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'gurumurkar@gmail.com',
            pass:'gurudev123'
        }
    });

    var mailOption={
        from:'gurumurkar@gmail.com',
        to:'harshalpyadav1997@gmail.com',
        subject:'sending mail using node js',
        text:'Hello dear,i m Gurudev...sending these msg through my Chatapp'
    }
    transporter.sendMail(mailOption,function(err,info){
        if(err)
        {
            console.log(err)
        }
        else{
            console.log("Email sent:"+info.responce);
        }
    })
    

}

module.exports=mailsend();


