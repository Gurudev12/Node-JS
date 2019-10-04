const AWS = require('aws-sdk');
require('dotenv').config()
const config=require("../config/config")

const s3Client = new AWS.S3({
    signatureVersion:"v4",
    accessKeyId:config.awsAccessKey,
    secretAccessKey:config.awsSecretKey

});

module.exports = s3Client;