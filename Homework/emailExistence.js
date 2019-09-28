
let emailExistence=require('email-existence')


emailExistence.check('gurudevrameshmurkar@gmail.com', function(error, response){
    console.log('res: '+response);
});