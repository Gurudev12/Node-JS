const utility=require('/home/administrator/Desktop/Bridgelab/DataStructure/PrimeAnagramStack/anagramstack')
const util=require('/home/administrator/Desktop/Bridgelab/Utility/Utility')
const ob=new utility.LinkedList
function PrimeAnagram()
{
    
    let start=1;end=1000
   let  AnagramStack=[]
    //Calculate prime array
    let primeArray=util.displayPrime(start,end)

    
   
    //Calculate all anagram
   let anagram=util.displayAnagram(primeArray)
   console.log("Anagram array is................")
  console.log(anagram)

   //push data into linked list
   console.log("1 to 1000 Anagram numbers using Linked list :")
   for(let i=0;i<anagram[0].length;i++)
   {
    ob.push(anagram[0][i])
   }

    j=0
    while(!ob.isEmpty())
    {
        AnagramStack[j]=ob.pop()
        j++
    }
    console.log("Anagram of prime no using stacks are")
    console.log(AnagramStack)
}
module.exports=PrimeAnagram()