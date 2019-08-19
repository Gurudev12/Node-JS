var utility=require('../Utility/Utility')

    var Input=require('readline-sync')
    console.log("Enter Decimal Number:")
    var number=Input.questionInt()

    var binary=utility.BinaryDisplay(number)
    console.log("Binary Number:")
    console.log(binary)

   var swapnib =utility.BinarySwap(binary)
   console.log("After swapping upper nibble and lower nibble")
   console.log(swapnib)

   var decimal=utility.DecimalConversion(swapnib)
   console.log("Decimal Number of Swaped nibble:")
   console.log(decimal)
   console.log("Cheching.....")

   utility.ToCheckPowTwo(decimal)