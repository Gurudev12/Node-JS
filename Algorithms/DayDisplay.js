var utility=require('../Utility/Utility')


function Day()
{
    var Input=require('readline-sync')
    console.log("Enter day")
    var day=Input.questionInt()
    console.log("Enter month")
    var month=Input.questionInt()
    console.log("Enter day")
    var year=Input.questionInt()

   var check=utility.DisplayDay(day,month,year)

   if(check==6)
   {
       console.log("Sunday")
   }
   else if(check==0)
   {
       console.log("Monday")
   }
   else if(check==1)
   {
       console.log("Tueday")
   }
   else if(check==2)
   {
       console.log("Wednesday")
   }
   else if(check==3)
   {
       console.log("Thursday")
   }
   else if(check==4)
   {
       console.log("Friday")
   }
   else
   {
       console.log("Saturday")
   }
}
module.exports=Day()