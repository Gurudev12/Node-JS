const mongoose = require("mongoose");
const logger = require('../config/log')
const config = require("../config/config");
require("dotenv").config();

class Mongoose {
    mongooseService() {

        mongoose.connection.on('disconnected', function () {
            logger.error(("Mongoose default connection is disconnected"));
            process.exit(1);
        });

        mongoose.connect(config.url, { useNewUrlParser: true }, (err, data) => {
            if (err) {
                logger.error(err);

            } else {
                logger.info("Successfully connected to database")
            }
        })
    }

}
let mongooseObject = new Mongoose();
module.exports = mongooseObject;
