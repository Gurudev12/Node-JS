let input=require('readline-sync')
let utility=require('../Utility/Utility')
function leap()
{
    console.log("Enter year")
    let year=input.question()

    leap=utility.leapYear(year)

    if(leap==true)
    {
        console.log("Yes leap year")
    }
    else{
        console.log("Not Leap year")
    }
}
module.exports=leap()