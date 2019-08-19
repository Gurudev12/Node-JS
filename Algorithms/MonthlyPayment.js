var utility=require('../Utility/Utility')


function Payment()
{
    
    var Input=require('readline-sync')
    console.log("Enter Principal Amount:")
    var amount=Input.questionInt()

    console.log("Enter Year")
    var year=Input.questionInt()

    console.log("Enter Rate of interest:")
    var interest=Input.questionInt()

    utility.DisplayPayment(amount,year,interest)
    
}
module.exports=Payment()