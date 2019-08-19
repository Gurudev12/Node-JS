var utility=require('../Utility/Utility')

function BinarySearchWord()
{
    var Input=require('readline-sync')
console.log("Enter size of Array:")
var size=Input.question()
var i
var array=new Array()
console.log("Enter array"+size+ "element")
for(i=0;i<size;i++)
{
    array[i]=Input.question()
}
    array.sort()
    console.log(array)

    console.log("Enter key to find element")
    var key=Input.question()

    utility.Binary(array,key)
}
module.exports=BinarySearchWord()