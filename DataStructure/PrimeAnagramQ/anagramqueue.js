let input=require('readline-sync')
let utility=require('/home/administrator/Desktop/Bridgelab/Utility/Utility')
let util=require('/home/administrator/Desktop/Bridgelab/DataStructure/PrimeAnagramQ/linkedqueue')
let ob=new util.LinkedList()
function anagramOfNumber()
{
let j=0,array=[]
    start=1;end=1000
    let primeArray=utility.displayPrime(start,end)
    console.log("1 to 1000 Anagram numbers using Linked list :")
   
   let anagram=utility.displayAnagram(primeArray)

   for(let i=0;i<anagram[0].length;i++)
   {
       ob.push(anagram[0][i])
   }
   
  
   while(!ob.isEmpty())
   {
    array[j]=ob.pop()
    j++
   }
   console.log(array)
   

}
module.exports=anagramOfNumber()