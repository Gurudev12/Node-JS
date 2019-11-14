/*************************************************************************
 * @Execution        : 1. default node       cmd> nodemon model.js
 * 
 * @Purpose          : 
 *                    
 *                     
 *                    
 * 
 * @file            : server.js
 * @author          : Gurudev Murkar
 * @version         : 1.0
 * @since           : 25-9-2019
 * 
 **************************************************************************/
require("dotenv").config();

const express = require("express");
const cors = require('cors')
const schedule = require('node-schedule');
const validator = require("express-validator");
const bodyParser = require("body-parser");
const config = require("../backEnd/config/config");
const mongooseObject = require("./service/mongoose")
const cacheClient = require("./service/redisConnection")
const app = express();
const logger = require('./config/log')
const routes = require("./routes")
const swaggerUi =require("swagger-ui-express");
const swaggerFile=require("./swagger/swagger.json")



const PORT = config.PORT;

app.use(bodyParser.json());
app.use(cors())
app.use(validator());
app.use("/", routes);

const ctrl = require("./controller/note")

app.use("/swagger",swaggerUi.serve,swaggerUi.setup(swaggerFile))
mongooseObject.mongooseService();

cacheClient.connect();


app.listen(PORT, () => {
  logger.info("Server started at port:", PORT);
});

// schedule.scheduleJob('* * * * * *', function () {
//   here we are assuming that perticular user login with its userId.because we want to fetch notes based on userId

//   let userId = "5d97427de380595ced58580c"
//   ctrl.reminder(userId)
//     .then(reminderData => {
//       logger.info("Get reminder")
//     })
//     .catch(err => {
//       logger.info("ERRRR", err);
//     })
// });

module.exports = app;
