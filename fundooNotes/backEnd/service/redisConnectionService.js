const redis = require("redis");
const logger = require('../config/log')

class Cache {
    host = '127.0.0.1';     // Default connection 
    port = '6379';          // Default port
    name = '';              // Redis server Username 
    password = '';          // Redis server Password 
    client = undefined;     // Redis client default is undefined 

    constructor({
        host ,
        port ,
        name ,
        password
    }){
        this.host = host || this.host;
        this.port = port || this.port;
        this.name = name || '';
        this.password = password || '';
    }
    connect(){
        this.client = redis.createClient({
            port      : this.port,              // replace with your port
            host      : this.host,              // replace with your hostanme or IP address
            // password  : 'your password',     // replace with your password
            // optional, if using SSL
            // use `fs.readFile[Sync]` or another method to bring these values in
            // tls       : {
            //   key  : stringValueOfKeyFile,  
            //   cert : stringValueOfCertFile,
            //   ca   : [ stringValueOfCaCertFile ]
            // }
        });
        this.monitor();
    }

    getConnect(){
        if (typeof this.client === 'undefined'){
            this.connect();
        }
        return this.client;
    }

    monitor(){
        this.client.on('connect', function (){
            logger.info(`Redis client connected successfully`);
        });
        this.client.on("error", function (err) {
            if(err){
                logger.error(`Error Cache : ${err}`);
            }
        });
    }
}

let cacheClient = new Cache({
    // host = '',
    // port = '',
    // username = '',
    // password = '',
})

module.exports = cacheClient;