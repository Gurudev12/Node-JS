var utility=require("../Utility/Utility");

function Quadratic()
{
  var Input=require('readline-sync')
  console.log("Enter value of a:")
  var a=Input.questionInt()

  console.log("Enter value of b:")
  var b=Input.questionInt()

  console.log("Enter value of c:")
  var c=Input.questionInt()

  var out=utility.DisplayQuadratic(a,b,c)
  console.log(out)
    
  return [a,b,c,out]
}
module.exports=Quadratic()