/******************************************************************************
 *  
 *  @Purpose: function CDP calling all the methods
 *
 *  @author  Gurudev Murkar
 *  @version 1.0
 *  @since   28-08-2019
 *
 ******************************************************************************/
let fs=require('fs')
let utility=require('../CDP/stockaccount')
let input=require('readline-sync')
//require file linked list and create object
let util=require('../../Homework/LinkedList')
let list=new util.LinkedList()
let ob=new utility.CDP()

//require file stack and create object
let stackUtil=require('../../Homework/StackLinkedList')
let obStack=new stackUtil.LinkedList()

//require file Queue and create object
let utilityQue=require('../../Homework/Queue')
let obQue=new utilityQue.Queue()

function CDP()
{
    let format = /^[0-9]+$/;
    try{
    //Reading companyshare
let data=fs.readFileSync("/home/administrator/Desktop/Bridgelab/OOPs concept/CDP/companyshare.json")
{
   let companyData=JSON.parse(data)
   let len=companyData.length
    console.log(companyData)
   
    //Reading Customer data
let dataCust=fs.readFileSync("/home/administrator/Desktop/Bridgelab/OOPs concept/CDP/custdata.json")
{
    let custDetails=JSON.parse(dataCust)
    console.log(custDetails)

count=0
do{
    //Design of UI
    
console.log("Enter your choice:")
console.log("1.Buy")
console.log("2.Sell")
console.log("Enter your choice:")
let choice=input.questionInt()

if (format.test(choice) == false) throw "choice should be in number format";

switch(choice)
{
case 1:
        let format = /^[a-zA-Z]+$/;
    try{

    console.log("Enter company symbol to buy share")
    let enteredSymbol=input.question()

    //checking validation for symbol
    if (format.test(enteredSymbol) == false) throw "entered symbol should be character";
    //checking entered Symbol with respect to json file
        if(enteredSymbol=='I' ||enteredSymbol=='J' || enteredSymbol=='V' || enteredSymbol=='A')
        {
          ob.toBuy(enteredSymbol);

        }
        else
        {   
            console.log("Please enter symbol between I,J,A,V")
        }
    }catch(e)
    {
        return e
    }
        break;
case 2:
    try{
        let format = /^\d{5}$|^\d{5}-\d{4}$/;
    //To sell share to company.
        console.log("Enter user who want to sell")
        let user=input.questionInt()
        //validation for user input
        if (format.test(zipcode) == false) throw "user input in number format"

        console.log("Enter  no of share to sell")
        let noShare=input.questionInt()
        console.log("Enter  symbol of company to sell")
        let compSymbol=input.question()
        ob.toSell(user,noShare,compSymbol)
    }catch(e)
    {
        return e
    }
        break;
default:
    console.log("You have Entered Wrong choice")

}
count++
}
while(choice==1)
}
}



//Reading updated companyShare file
let dataComp=fs.readFileSync("companyshare.json")
let companyDataUpdated=JSON.parse(dataComp)

//Maintain Linked of share of compny
console.log("Inserted element to linked list..")
    for(let i=0;i<companyDataUpdated.length;i++)
    {
        list.insertLast(companyDataUpdated[i].share)
    }
    list.printListData()

//Reading updated transaction file
let updatedTrans=fs.readFileSync("transaction.json")
let updatedTransaction=JSON.parse(updatedTrans)

//Maintaining stack of symbol &&  transaction time in Queue

    for(let j=0;j<updatedTransaction.length;j++)
    {
        obStack.push(updatedTransaction[j].symbol)
        obQue.enqueue(updatedTransaction[j].time)
    }
    console.log("Inserting company symbol to stack...")
    obStack.printList()
    //
    console.log("Inserting transaction time in Queue...")
    obQue.printQueue()

  
    return[choice,enteredSymbol,user]
}catch(e)
{
    return e
}

}
module.exports=CDP()