let input=require('readline-sync')
let utility=require('../Utility/Utility')
function isPrime()
{
    
    let start=1,end=100
    count=0
    console.log(end)
    let primeArray=utility.displayPrime(start,end)
    console.log(primeArray)
}

module.exports=isPrime()