const winston=require("winston")

const {transports, createLogger, format} = require('winston');

module.exports = createLogger({
format: format.combine(
format.timestamp(),
format.simple()
),
transports: [
new transports.Console(),
new transports.File({filename: './logs/logapi.log',level:'info'}),
new transports.File({filename: './logs/errorapi.log',level:'error'})
]
})