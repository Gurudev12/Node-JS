let utility=require('../Palindrome/palindromeutility')
let input=require('readline-sync')
let ob=new utility.Queue()

function palindromeString()
{
try
{
console.log("Enter Your String:")
let str=input.question()

if(str==null)throw err

let array=str.split('')
console.log(array)
let len =array.length
for(let i=0;i<array.length;i++)
{
    ob.enqueue(array[i])
    
}

let flag=1;
for(let i=0;i<Math.floor(len/2);i++ )
{
    let first,second;
    first=ob.removeFront();
    second=ob.removeRear();
    if(first!=second)
    {
        flag=0
        break;
    }
   
 
}
if(flag==0)
{
    console.log("Not palindrome")
}
else
{
    console.log("Palindrom")
}

return [ob, str, array]
} catch (err) {
    console.log(err);

}
}
module.exports=palindromeString()