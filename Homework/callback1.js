
function addition(a,b,callback)
{ 
var result=a+b;

callback(result);
}

function callback(result)
{
console.log("addition of two number is ",result)
}


addition(5,6,callback)
console.log("addition is done");











// function add(a,b,substract)
// {
//     result=a+b
//     console.log(result)
//     substract(result)
// }
// function substract(result)
// {
//     output=result-10
//     console.log("substraction==>",output)
// }

// add(10,5,substract)



