const redis = require("redis");
const client = redis.createClient();

// Storing token to redis.
    client.set("name", "Guru");
    
    client.get("name",(err,reply)=>{
        if (err) {
            console.log("ERRRRRRRR");
        }else{
            console.log("REPLY",reply);
            
        }
    })
    
   

    //     let nameArray=[{"name":"Guru"},{"name":"Pratham"},{"name":"Kajal"},{"name":"Vaishu"}]
    
    // for(let j=0;j<nameArray.length;j++){
    //     client.hmset('array', nameArray[j]);
    // }
    
   
    // client.hgetall('array', function(err, object) {
    //         console.log("WE GOT AN ARRAY FROM NOTES",object);
    // });

/*****************************************************************/











































//will check the existence of perticular key
client.exists('key', function(err, reply) {
    if (reply === 1) {
        console.log('exists');
    } else {
        console.log('doesn\'t exist');
    }
});
    // client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

    // client.hgetall('frameworks', function(err, object) {
    //     console.log(object);
    // });


/******************************************************* */
