var utility=require('../Utility/Utility')

function WindChill()
{
    var Input=require('readline-sync')
    console.log("Enter value of t:")
    var t=Input.questionInt()

    console.log("Enter value of v:")
    var v=Input.questionInt()

    var result=utility.CalculateWindChill(t,v)

    return[t,v,result]
}
module.exports=WindChill()