const redis = require("redis");
const client = redis.createClient();

class RedisClass{


    redisSetter(eventName,token){
        return new Promise((resolve,reject)=>{
            client.set(eventName,token,(err,response)=>{
                if(response=="OK"){
                 resolve(response);
                }
                else{
                reject(err);                    
                }
            });
        });
    }


    redisGetter(eventName,callback){
        client.get(eventName, (err, reply)=>{
            if(err){
                callback(err);
            }else{
                callback(null,reply);
            }
        });
    }



}
let redisClassObject=new RedisClass();
module.exports=redisClassObject;