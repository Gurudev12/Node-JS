
function addition(a,b,displayAdd) //Second call
{ 
var result=a+b;
console.log("addition is done");
displayAdd(result,multiplication);//third call
}

function displayAdd(result,multiplication) //4th
{
console.log("addition of two number is "+result)
multiplication(result)
}
function multiplication(result) //5th
{
   let multi=result*2
    console.log("Multiplication result is:"+multi)

}

addition(5,6, displayAdd) //first call