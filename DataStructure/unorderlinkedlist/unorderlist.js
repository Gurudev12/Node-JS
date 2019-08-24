let utility=require('../unorderlinkedlist/unorderlinkedlistutility')
let input=require('readline-sync')
let fs=require('fs');
function link()
{
let array=new Array()
let data=fs.readFileSync('file.txt')
  
    array=(data.toString().split(","))
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
console.log(present)

//Find Index Location
let position=list.findLocation(key)
console.log(position)


//if element present then remove
if(present===true)
{
    list.removeAt(position)
    let data=list.printListData()
    fs.writeFileSync('file.txt',data)
    console.log(data)
}

//else Add element
else
{
   list.insertAdd(key)
   let data=list.printListData()
    fs.writeFileSync('file.txt',data)
    console.log(data)
}

}
module.exports=link()
