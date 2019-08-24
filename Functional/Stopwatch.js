var utility=require('../Utility/Utility')

module.exports={Stopwatch:function(){

    var Input=require('readline-sync')

    console.log("Enter one to Start stopwatch:")
    var one=Input.question()


var total=utility.StopWatchRun(one)

return [one,total]
}