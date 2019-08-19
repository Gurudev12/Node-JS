var total=0
var note1000=note500=note100=note50=note10=note5=note2=note1=amount=0

console.log("Enter amount")
var Input=require('readline-sync')
amount=Input.question()
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
total=note1000+note500+note100+note50+note10+note5+note2+note1
console.log(total)
