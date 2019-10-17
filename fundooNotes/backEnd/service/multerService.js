const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./s3Service");
const config = require("../config/config");
const path = require("path")

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.bucket,
        key: (req, file, callback) => {
            let ext = path.extname(file.originalname)
        
            if (ext == '.jpg' || ext == '.jpeg') {
                
                return callback(null, file.originalname);
            } 
            else {

                return callback("Please upload valid image format");
            }
            // console.log("\n\n\tFile received in config --> multer ", file);

        }
    })
});

module.exports = upload;


