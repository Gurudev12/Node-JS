const config = require("../config/config");

class Redis {

    constructor(){
        this.client = config.cacheClient;
        // this.client = config.getConnect();
    }

    redisSetter(key, value) {
        let that = this;
        return new Promise((resolve, reject) => {
            that.client.set(key, value, (err, response) => {
                if (response == "OK") {
                    resolve(response);
                }
                else {
                    reject(err);
                }
            });
        });
    }


    redisGetter(key, callback) {
        this.client.get(key, (err, reply) => {
            if (err) {
                callback(err);
            } else {

                callback(null, reply);
            }
        });
    }

    delete(deleteArray){
        return new Promise((resolve,reject)=>{
            this.client.del(deleteArray,(err, response) =>{
                if (response) {
                 return  resolve(true)
                } else{
                return reject(err)
                }
             })
        })
        
    }




    redisGetterLabel(key) {
        return new Promise((resolve,reject)=>{

            this.client.get(key, (err, reply) => {
                if (err) {
                    reject (err);
                } else {                    
                    resolve(reply);
                }
            });
        })
    }

    redisKeyRemove(callback) {
        //This is inbuild function which will remove all the keys from redis
        this.client.flushdb(function (err, succeeded) {
            return callback(err, succeeded);  //"succeeded" contain "OK" value
        });
    }

    redisManager(loginKey) {

        return new Promise((resolve, reject) => {
            let value
            //First we will get the token from redis which will created at login time and store it into "token" variable
            this.redisGetter(loginKey, (err, reply) => {
                value = reply
                if (value) {
                    //This method will remove all the keys from redis whatever it contain
                    this.redisKeyRemove((err, succeeded) => {
                        if (succeeded == "OK") {
                            this.redisSetter(loginKey, value)
                                .then(response => {
                                    //"Set login token after redis flush"
                                    resolve(response)
                                })
                                .catch(err => {
                                    //"Error in set login key in redis"
                                    reject(err)
                                })
                        } else {
                            //"Keys are not removed successfully"
                            reject(err)
                        }
                    })
                } else {
                    reject("TOKEN IS NOT GOT FROM REDIS")
                }
            })

        })

    }



}
let redisClassObject = new Redis();
module.exports = redisClassObject;