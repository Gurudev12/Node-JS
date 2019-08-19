var utility=require('../Utility/Utility')


var Input=require('readline-sync')
var array=new Array()

console.log("Enter size of array:")
var size=Input.question()

console.log("Enter array element:")
for(var i=0;i<size;i++)
{
    array[i]=Input.question() 
}
console.log("Array before sorting...")
console.log(array)

    var sort=utility.BubbleSort(array)
    console.log("Array after Sorting..")
    console.log(sort)
