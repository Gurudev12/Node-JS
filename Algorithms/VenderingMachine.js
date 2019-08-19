var utility=require('../Utility/Utility')


var Input=require('readline-sync')
console.log("Enter Amount:")
var amount=Input.question()

utility.DisplayNotes(amount)