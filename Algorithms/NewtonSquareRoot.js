var utility=require('../Utility/Utility')



    var Input=require('readline-sync')
    console.log("Enter Number:")
    var number=Input.questionInt()

   if(number>0)
   { 
    utility.DisplaySquareRoot(number)
   }
   else
   {
       console.log("Enter number greater than 0")

   }
