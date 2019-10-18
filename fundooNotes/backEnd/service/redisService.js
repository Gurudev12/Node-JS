const redis = require("redis");
const client = redis.createClient();

class RedisClass {


    redisSetter(key, value) {
        return new Promise((resolve, reject) => {
            client.set(key, value, (err, response) => {
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

        client.get(key, (err, reply) => {
            if (err) {
                callback(err);
            } else {

                callback(null, reply);
            }
        });
    }

    redisKeyRemove(callback) {
        //This is inbuild function which will remove all the keys from redis
        client.flushdb(function (err, succeeded) {
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
let redisClassObject = new RedisClass();
module.exports = redisClassObject;