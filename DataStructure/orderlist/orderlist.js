let utility=require('./linkedlist')
let input=require('readline-sync')
let fs=require('fs');
function OrderLink()
{
let array=new Array()
let data=fs.readFileSync('orderfile.txt')
  
    array=(data.toString().split(",").map(Number))
    array.sort()
    fs.writeFileSync('file1.')
    console.log(array)


let  i
let list= new utility.LinkedList()
for(i=0;i<array.length;i++)
{
  list.insertAdd(array[i]) 
  
}

//Enter key to Find
console.log("Enter element to Search")
let key=input.question()

//Search Algorithm
let present=list.searchElement(key)
console.log("Element present:"+present)

//Find Index Location
let position=list.findLocation(key)
console.log("Present at position:"+position)


//if element present then remove
if(present===true)
{
    list.removeAt(position)
    let data=list.printListData()
    fs.writeFileSync('orderfile.txt',data)
    console.log(data)
}
//else Add element
else
{

    list.insertAdd(key)
    let data=list.printListData()
    string=fs.readFileSync('orderfile.txt',data)
    array=(string.toString().split(",").map(Number))
    console.log(array)

   
}

}
module.exports=OrderLink()
