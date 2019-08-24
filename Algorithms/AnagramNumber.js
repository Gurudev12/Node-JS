let input=require('readline-sync')
let utility=require('/home/administrator/Desktop/Bridgelab/Utility/Utility')
function anagramOfNumber()
{

    start=1;end=1000
    let primeArray=utility.displayPrime(start,end)
    console.log("1 to 1000 Prime numbers are:")
   console.log(primeArray)
   let anagram=utility.displayAnagram(primeArray)
    console.log(" Prime anagram number:")
   console.log(anagram[0])

   console.log("Not Prime anagram number:")
   console.log(anagram[1])

}
module.exports=anagramOfNumber()