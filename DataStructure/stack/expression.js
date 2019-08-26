let utility=require('../stack/stackutility')
let input=require('readline-sync')
function ExpresionStack()
{
try{

console.log("Enter Expression:")
let expression=input.question()


console.log("Enput Expression is:")
exp=expression.toString().split("")

console.log(exp)

let ob= new utility.Stack()
let flag=0
for(let i=0;i<exp.length;i++)
{
    if(exp[i]=='(' || exp[i]=='{' || exp[i]=='[' )
    {
       ob.push(exp[i])
    }
    else if(exp[i]==')' || exp[i]=='}' || exp[i]==']')
    {
        if(ob.isEmpty())
        {
            flag=1
        }
        else
        {
        ob.pop(exp[i])
        }
    }   

}
let value=ob.isEmpty()

if(value==true && flag!=1)
{
    console.log("balanced")
}
else
{
    console.log("Not Balanced")
}
return [expression,ob,exp]
} catch (err) {
    console.log(err);

}
}
module.exports=ExpresionStack()