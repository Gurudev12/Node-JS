let fs=require('fs')
let utility=require('../CDP/stockaccount')
let input=require('readline-sync')
//require file linked list and create object
let util=require('/home/administrator/Desktop/Bridgelab/Homework/LinkedList')
let list=new util.LinkedList()
let ob=new utility.CDP()

//require file stack and create object
let stackUtil=require('/home/administrator/Desktop/Bridgelab/Homework/StackLinkedList')
let obStack=new stackUtil.LinkedList()

//require file Queue and create object
let utilityQue=require('/home/administrator/Desktop/Bridgelab/Homework/Queue')
let obQue=new utilityQue.Queue()

function CDP()
{
    //Reading companyshare
let data=fs.readFileSync("companyshare.json")
{
   let companyData=JSON.parse(data)
   let len=companyData.length
    console.log(companyData)
   
    //Reading Customer data
let dataCust=fs.readFileSync("custdata.json")
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

switch(choice)
{
case 1:


    console.log("Enter company symbol to buy share")
    let enteredSymbol=input.question()

    //checking entered Symbol with respect to json file
        if(enteredSymbol=='I' ||enteredSymbol=='J' || enteredSymbol=='V' || enteredSymbol=='A')
        {
          ob.toBuy(enteredSymbol);
        }
        else
        {   
            console.log("Please enter symbol between I,J,A,V")
        }
        break;
case 2:
    //To sell share to company.
        console.log("Enter user who want to sell")
        let user=input.questionInt()
        console.log("Enter  no of share to sell")
        let noShare=input.questionInt()
        console.log("Enter  symbol of company to sell")
        let compSymbol=input.question()
        ob.toSell(user,noShare,compSymbol)
        break;
default:
    console.log("You have Entered Wrong choice")

}
count++
}
while(count<2)
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

//Maintaining stack of symbol &&transaction time in Queue

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

}
module.exports=CDP()