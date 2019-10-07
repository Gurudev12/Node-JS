const AWS = require('aws-sdk');
const config=require("../config/config")

const s3Client = new AWS.S3({
    signatureVersion:"v4",
    accessKeyId:config.awsAccessKey,
    secretAccessKey:config.awsSecretKey

});

module.exports = s3Client;