var fs=require("fs")
fs.readFile('file.txt',function(error,data){
    if(error)
    { 
         display()
        throw (error)
    }
    console.log(data.toString())
});

function display()
{
    console.log("File is not present...")
}
process.on("Uncaught exception",function(error){
    console.log("Error is caught.....")
});
