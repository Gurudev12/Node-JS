var utility=require('../Utility/Utility')


function TempCoversion()
{
    
    var Input=require('readline-sync')
    console.log("Enter Temperature value:")
    var temp=Input.questionInt()
    
    utility.DisplayFahrenheit(temp)
    utility.DisplayCelsius(temp)

}
module.exports=TempCoversion()