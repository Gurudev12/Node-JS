
require('dotenv').config({ path: './.env' })

const cacheClient = require("../service/redisConnection")

module.exports = {
    url:process.env.MONGODB_URL,
    
    PORT:process.env.PORT,

    userEmail:process.env.USER_EMAIL,
    userPassword:process.env.USER_PASSWORD,

    secretKey:process.env.SECRETKEY,

    awsAccessKey:process.env.AWS_ACCESSKEY,

    awsSecretKey:process.env.AWS_SECRETKEY,

    bucket:process.env.BUCKET,
    cacheClient : cacheClient.getConnect()
}