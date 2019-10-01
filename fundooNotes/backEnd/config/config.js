
require('dotenv').config({ path: './.env' })


module.exports={
    url:process.env.MONGODB_URL,
    
    PORT:process.env.PORT,

    userEmail:process.env.USER_EMAIL,
    userPassword:process.env.USER_PASSWORD,

    secretKey:process.env.SECRETKEY
}