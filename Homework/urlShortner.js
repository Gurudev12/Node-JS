var shortUrl = require('node-url-shortener');
 
shortUrl.short('https://google.com', function(err, url){
    console.log(url);
});
 