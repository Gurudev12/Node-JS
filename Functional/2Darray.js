var utility=require("../Utility/Utility");

module.exports={two_d_array:function(){

    var row,column;
    var input=require('readline-sync')
    console.log("Enter row and column size for creating Integer, Double, boolean");
    row=input.question();
    column=input.question();
    var arrayInteger=new Array(), arrayDouble=[[]], arrayBoolean=[[]];

    arrayInteger=utility.SetIntegerOfTwoDArray(arrayInteger,row,column);
    arrayDouble=utility.SetDoubleOfTwoDArray(arrayDouble,row,column);


    console.log("displaying Integer Array element");
   var arrayInteger= utility.displayArray(arrayInteger);

    console.log("displaying Double Array element");
    var arrayDouble= utility.displayArray(arrayDouble);


    return [row,column,arrayInteger,arrayDouble,arrayBoolean]
}
}