var utility=require('../Utility/Utility')

module.exports={Distance:function(){
    var Input=require('readline-sync')

    console.log("Enter the value of x and y:")
    var x=Input.questionInt()
    var y=Input.questionInt()

    var distance=utility.DisplayDistance(x,y)
    console.log(distance)
    return [x,y,distance]

}
}