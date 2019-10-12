const multer = require('multer');
const multerS3 = require('multer-s3')
const s3 = require("./s3Service");
const config=require("../config/config")


var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket:config.bucket,
        key: (req, file, callback) => {
            
            // console.log("\n\n\tFile received in config --> multer ", file);
            callback(null, file.originalname);
        }
    })
});

module.exports = upload;