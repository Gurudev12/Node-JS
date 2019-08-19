var utility=require('../Utility/Utility')

    var Input=require('readline-sync')
    console.log("Enter Number:")
    var number=Input.questionInt()

    var binary=utility.BinaryDisplay(number)
    console.log(binary)