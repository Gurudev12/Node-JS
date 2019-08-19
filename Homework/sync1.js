const fs = require('fs')
fs.readFile('file.txt',function(err,data){
  console.log(data.toString())
  
})

setTimeout(function(){
  console.log("msg"),10000
})
console.log("1")
  console.log("2")
  console.log("3")
var data1=fs.readFileSync('file2.txt')
console.log(data1.toString())
