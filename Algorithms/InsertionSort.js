var utility=require('../Utility/Utility')


var Input=require('readline-sync')
console.log("Enter String:")
var str=Input.question()

   var array= utility.InsertionSort(str)
    console.log("Array after Sorting..")
    console.log(array)
