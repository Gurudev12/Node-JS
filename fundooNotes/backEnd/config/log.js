const winston=require("winston")
// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     defaultMeta: { service: 'user-service' },
//     transports: [
//       //
//       // - Write to all logs with level `info` and below to `combined.log` 
//       // - Write all logs error (and below) to `error.log`.
//       //
//       new winston.transports.File({ filename: 'error.log', level: 'error' }),
//       new winston.transports.File({ filename: 'combined.log' })
//     ]
//   });


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