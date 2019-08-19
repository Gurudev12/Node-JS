module.exports=
{
 square(num)
{
    var sq=num*num
    return sq
},

/*2DArray..//////////////////////////////////////////////////////////////////////////////////////////*/
SetIntegerOfTwoDArray(array,row,column)
    {   
        var Input=require('readline-sync')
        console.log("enter "+row*column+" total element to fiil twoD array of Integer");
        for(var i=0;i<row;i++)
        {   array[i]=[];
            for(var j=0;j<column;j++)
            {
                array[i][j]=Input.question();
            }
        }
        return array;
    },

    
    SetDoubleOfTwoDArray(array,row,column)
    {   
        var Input=require('readline-sync')
        console.log("enter "+row*column+" total element to fiil twoD array of Double");
        for(var i=0;i<row;i++)
        {   array[i]=[];
            for(var j=0;j<column;j++)
            {
                array[i][j]=parseFloat(Input.question()).toFixed(2);
            }
        }
        return array;
    },

    displayArray(array)
    {
        console.log(array);
    },
/*Sum of Three integer=0//////////////////////////////////////////////////////////////////////////////////////////*/
SumInt(array)
{
    var i,j,k
    for(i=0;i<array.length-2;i++)
    {
        for(j=i+1;j<array.length-1;j++)
        {
            for(k=i+2;k<array.length;k++)
            {
                if(array[i]+array[j]+array[k]==0)
                {
               console.log(" "+array[i] +" "+array[j] + " "+array[k])
               return array[i],array[j] ,array[k]
                }
           
            }
        }    
    }
},
/*Distance.js//////////////////////////////////////////////////////////////////////////////////////////*/
DisplayDistance(x,y)
{
   var value=Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
    return value
},



/*Permutation.js//////////////////////////////////////////////////////////////////////////////////////////*/
Permutation()
{

},


/*StopWatch.js//////////////////////////////////////////////////////////////////////////////////////////*/
StopWatchRun()
{
    var Input=require('readline-sync')

 
    var start=new Date().getSeconds()

    console.log("Enter Two to end Stop watch:")
    var two=Input.question()
   
    
    var end=new Date().getSeconds()

    var total=end-start
  
    return total
    
},

/*TicTacToe.js//////////////////////////////////////////////////////////////////////////////////////////*/
DisplayMatrix(matrix,pos,player)
{
    if(pos==1)
        matrix[0][0]=player
    
    else if(pos==2)
        matrix[0][1]=player
    else if(pos==3)
        matrix[0][2]=player
    else if(pos==4)
        matrix[1][0]=player
    else if(pos==5)
        matrix[1][1]=player
    else if(pos==6)
        matrix[1][2]=player
    else if(pos==7)
        matrix[2][0]=player
    else if(pos==8)
        matrix[2][1]=player
    else if(pos==9)
        matrix[2][2]=player
},
Show(matrix)
{
    console.log(matrix[0][0]+"|"+matrix[0][1]+ "|"+matrix[0][2])
    console.log(matrix[1][0]+"|"+matrix[1][1]+ "|"+matrix[1][2])
    console.log(matrix[2][0]+"|"+matrix[2][1]+ "|"+matrix[2][2])
},

CheckWin(matrix)
{
    var c=' ',flag=0
    
    if(matrix[0][0]==matrix[0][1] && matrix[0][1]==matrix[0][2])
        c=matrix[0][0]
    else if(matrix[1][0]==matrix[1][1] && matrix[1][1]==matrix[1][2])
        c=matrix[1][0]
    else if(matrix[2][0]==matrix[2][1] && matrix[2][1]==matrix[2][2])
        c=matrix[2][0]
    else if(matrix[0][0]==matrix[1][0] && matrix[1][0]==matrix[1][2])
        c=matrix[0][0]
    else if(matrix[0][1]==matrix[1][1]  && matrix[1][1]==matrix[2][1])
        c=matrix[0][1]
    else if(matrix[0][2]==matrix[1][2] && matrix[1][2]==matrix[2][2])
        c=matrix[0][2]
    else if(matrix[0][0]==matrix[1][1] && matrix[1][1]==matrix[2][2])
        c=matrix[0][0]
    else if(matrix[0][2]==matrix[1][1] && matrix[1][1]==matrix[2][0])
        c=matrix[0][2]
       
         return c
        

},


/*Quadratic.js//////////////////////////////////////////////////////////////////////////////////////////*/
DisplayQuadratic(a,b,c)
{
    

    var delta=(b*b)-(4*a*c)
    console.log(delta)

    if(delta>0)
    {
        var root1=(-b+Math.sqrt(delta))/(2*a)
        var root2=(-b-Math.sqrt(delta))/(2*a)
    
        return [root1,root2]
    }
 
},

/*WindChill.js//////////////////////////////////////////////////////////////////////////////////////////*/

CalculateWindChill(t,v)
{
    if(t>=1 && t<=50 && v>3 && v<120)
    {
        var v=Math.pow(v,0.16)
        var w=35.74+(0.6215*t)+((0.4275*t)-35.75)*v
        console.log(w)
        return w
    }
},
/*/////////////////////////////////////////////////////////////////////////////////////////*/
/*ALGORITHMS//////////////////////////////////////////////////////////////////////////////////////////*/
/*6.BinaraySearchWord.js//File.js////////////////////////////////////////////////////////////////////////////////////////*/
Binary(array,key)
{
   
    var low=0
    var high=array.length-1
    var mid=low+high/2
    var flag=0
    while(low<=high)
    {
        if(array[mid].localeCompare(key)==0)
        {
            console.log("Element present at "+mid)
            flag=1
            break
        }
        else if(key<array[mid])
        {
            high=mid
        }
        else if(key>array[mid])
        {
            low=mid
        }
        mid=low+high/2
    }

    if(flag=0)
    {
        console.log("Element not present")
    }
},
/*7.Insertion sort/////////////////////////////////////////////////////////////////////////////////////////*/
InsertionSort(str)
{
    var temp,j,i
    var array=new Array()
    array=str.split("")

    console.log("Array before Sorting..")
    console.log(array)

    for(i=1;i<array.length;i++)
    {
        temp=array[i]
        j=i
        while(j>=0 && temp<array[j-1])
        {
           array[j]=array[j-1]
           j=j-1
        }
        array[j]=temp
    }
    return array
},
/*8.Bubble sort/////////////////////////////////////////////////////////////////////////////////////////*/
BubbleSort(array)
{
    var i,j,temp=0
    for(i=0;i<array.length;i++)
    {
        for(j=0;j<array.length;j++)
        {
            if(array[j+1]<array[j])
            {
                temp=array[j+1]
                array[j+1]=array[j]
                array[j]=temp
            }
        }
    }
    return array
},
/*10.Vendering Machine/////////////////////////////////////////////////////////////////////////////////////////*/
DisplayNotes(amount)
{
    var totalnotes=0
    var note1000=note500=note100=note50=note10=note5=note2=note1=0
    if(amount>1000)
    {
        note1000=parseInt(amount/1000)
        amount=amount-(note1000*1000)
        console.log(""+note1000+" notes of 1000")
    }
    if(amount>500)
    {
        note500=parseInt(amount/500)
        amount=amount-(note500*500)
        console.log(""+note500+" notes of 500")
    }
    if(amount>100)
    {
        note100=parseInt(amount/100)
        amount=amount-(note100*100)
        console.log(""+note100+" notes of 100")
    }
    if(amount>50)
    {
        note50=parseInt(amount/50)
        amount=amount-(note50*50)
        console.log(""+note50+" notes of 50")
    }
    if(amount>10)
    {
        note10=parseInt(amount/10)
        amount=amount-(note10*10)
        console.log(""+note10+" notes of 10")
    }
    if(amount>5)
    {
        note5=parseInt(amount/5)
        amount=amount-(note5*5)
        console.log(""+note5+" notes of 5")
    }
    if(amount>2)
    {
        note2=parseInt(amount/2)
        amount=amount-(note2*2)
        console.log(""+note2+" notes of 2")
    }
    else
    {
        note1=parseInt(amount/1)
        amount=amount-(note1*1)
        console.log(""+note1+" notes of 1")
    }
    totalnotes=(note1000+note500+note100+note50+note10+note5+note2+note1)
    console.log(totalnotes)
},





/*11.DayOfWeek.js//////////////////////////////////////////////////////////////////////////////////////////*/
DisplayDay(day,month,year)
{
   
    var y,x,m,d
    y = (year-(14-month)/12)
    x = (y+y/4-y/100+y/400)
    m =(month+12*((14-month)/12)-2)

    d=parseInt(((day+x+31*m/12)%7))
    console.log(d)

    return d
},
/*12.Temperature.js//////////////////////////////////////////////////////////////////////////////////////////*/
DisplayFahrenheit(temp)
{
    var fahrenheit=(temp*9/5)+ 32
    console.log(fahrenheit)
},
DisplayCelsius(temp)
{
 var celsius=(temp-32)*5/9
 console.log(celsius)
},

/*13.monthlypayment.js//////////////////////////////////////////////////////////////////////////////////////////*/
DisplayPayment(amount,year,interest)
{
    var n=12*year
    var r=interest/(12*100)

var payment=parseInt((amount*r)/(1-(Math.pow((1+r),-n))))
console.log(payment)
},
/*14.NewtonSqrt.js//////////////////////////////////////////////////////////////////////////////////////////*/
DisplaySquareRoot(number)
{
var t=number
var epislon =(1e-15)

while (Math.abs(t - number/t) > epislon*t)
 {
    t = (number/t + t) / 2.0;
 }
 console.log(t)
},
/*15.Binary.js//////////////////////////////////////////////////////////////////////////////////////////*/
BinaryDisplay(number)
{
    var i
var array=new Array()

for(i=0;i<8;i++)
{
    var digit=number%2
    array[i]=digit
    number=parseInt(number/2)
}

return array.reverse()

},
/*14.BinarySwap.js//////////////////////////////////////////////////////////////////////////////////////////*/
BinarySwap(binary)
{
     var j=binary.length/2
var i
     for(var i=0;i<binary.length/2;i++)
     {
         temp=binary[i]
         binary[i]=binary[j]
         binary[j]=temp
         j++
     }
     return binary

},
DecimalConversion(swapnib)
{
    var j
    var num=0,j=7
    while(j>=0)
    {
    for(var i=0;i<8;i++)
    {
    
        num=num+Math.pow(2,j)*swapnib[i]
        j--
    }
    }
    return num
},
ToCheckPowTwo(decimal)
{

while(decimal==2)
{
    if(decimal%2!=0)
    {
        false
    }
    decimal=parseInt(decimal/2)
}

    /*var num=decimal
    var pow=0,flag=0,i,x=parseInt(num/2)
    while(pow<num)
    {
       for(i=0;i<x;i++)
       {   
        pow=(Math.pow(2,i))
        console.log(pow)
        if(pow==num)
        {
            flag=1
            break
        }
        }
    }
    if(flag==1)
    {
    console.log("Yes,number is power of two")
    }
    else
    {
        console.log("Not power of two")

    }*/


},
}