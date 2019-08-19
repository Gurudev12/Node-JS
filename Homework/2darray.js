var input=require('readline-sync')
 var row=3,col=4
 var array=new Array(row)
 
 for(var i=0;i<row;i++)
 {
     array[i]=new Array(col)
 }

 for(var i=0;i<row;i++)
 {
     for(var j=0;j<col;j++)
     {
         array[i][j]=input.question()
     }
 }

 console.log(array)