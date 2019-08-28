const addOne=(a)=>
{
    return a+2
}
console.log(addOne(1))


//use of let key word
let abc='guru'
let pqr='pratham'
 let value=5

 if(value>3)
 {
     let xyx='inside block scope'
 }
 console.log(xyz)   //throw an error because xyz is blocked scope

 //let is updated but not re-declare
 let value='guru'
 let value='pratham'
 console.log(value)

 //Destructuring Assignments in Node.js
const [a,b,c]=[10,20,30]
console.log(a)
console.log(b)
console.log(c)

//Spread syntax in node js
function sum(x, y, z) {
    return x + y + z;
  }
  
  const numbers = [1, 2, 3];

  const [a,b,c]=[10,20,30]
  
  console.log(sum(...numbers));
  console.log(sum(...[a,b,c]));
  

  