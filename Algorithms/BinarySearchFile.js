var utility=require('../Utility/Utility')


var Input=require('readline-sync')
var array=new Array()
var fs = require('fs');
var data=fs.readFile('Myfile.txt',function(err, data)
{
    if (err) throw err;
    var array=data.toString().split(' ')


    console.log(array);
    array.sort()
    console.log(array)

    console.log("Enter key element to search:")
    var key=Input.question()

    utility.Binary(array,key)
});



