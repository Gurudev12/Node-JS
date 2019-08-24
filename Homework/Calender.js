let input=require('readline-sync')
let utility=require('../Utility/Utility')
function calender()
{
    let i
    let month=["","JAN","FEB","MAR","ARIL","MAY","JUN","JULY","AUG","SEPT","OCT","NOV","DEC",]
    let days=  ["","31","28","31","30","31","30","31","31","30","31","30","31"]


    console.log("Enter month & year")
    let enteredMonth=input.question()
    let enteredYear=input.question()

    console.log("*****Calender******")
    console.log(" "+month[enteredMonth]+ " "+enteredYear)
    console.log(" ")
    console.log(" S  M  T  W  Th  F  S")
 
    if(enteredMonth==2 && utility.leapYear()==true)
    {
        days[2]=29
    }

    let day=1
    let d=utility.DisplayDay(day,enteredMonth,enteredYear)
    console.log(d)

    for(i=0;i<d;i++)
    {
        process.stdout.write(" ");
    }
    for(i=1;i<=days[enteredMonth];i++)
    {
        if(i<10)
        {
            process.stdout.write(" ");
        }
            process.stdout.write(" "+i);

        if(((i+ d) % 7)==0)
        {
            console.log();
        }
     
    }
}
module.exports=calender()
