
/******************************************************************************
 *  
 *  @Purpose: Class CDP contain all the implementation methods
 *
 *  @author  Gurudev Murkar
 *  @version 1.0
 *  @since   28-08-2019
 *
 ******************************************************************************/
let fs=require('fs')
let input=require ('readline-sync')
//requring Stack linked list file & create object to call method
let util=require('/home/administrator/Desktop/Bridgelab/Homework/StackLinkedList')
let obStack=new util.LinkedList() 

let data=fs.readFileSync("/home/administrator/Desktop/Bridgelab/OOPs concept/CDP/companyshare.json")
let companyData=JSON.parse(data)

let dataCust=fs.readFileSync("/home/administrator/Desktop/Bridgelab/OOPs concept/CDP/custdata.json")
let custDetails=JSON.parse(dataCust)

let trans=fs.readFileSync("/home/administrator/Desktop/Bridgelab/OOPs concept/CDP/transaction.json")
let transactionData=JSON.parse(trans)

class CDP
{
//to buy share
toBuy(enteredSymbol)
{
   

    /*Asking which user wants to buy share*/
    console.log("Which user wants to buy share:")
    let user=input.questionInt()

  if(user<custDetails.length)
  {
    /*Asking which no of share to buy*/
    console.log("Enter no of share to buy:")
    let noShare=input.questionInt()



    /** take current date as tracsaction time and data */
    let time = new Date()
    console.log(time)



    for(let i=0;i<companyData.length;i++)
    {
        //checking symbol with company symbol
        //checking company share with userentered share
        //checking user amount with total share hi want * share price
        if(companyData[i].symbol== enteredSymbol )
        {
            if(custDetails[user].amount<companyData[i].price*noShare || companyData[i].share< noShare )
            {
            //checking customer balance is less than he want
            console.log("Sorry..You Dont have sufficient Amount or company dont have that much share.")
            }
            else
            {
                companyData[i].share=companyData[i].share-noShare
                custDetails[user].share+=noShare
                custDetails[user].amount-=noShare*companyData[i].price

                //pushinng Symbol of  Buying company to stack
               
                

            /*to update the transaction file*/
                let transaction={
                    buyer:custDetails[user].name,
                    noOfShare:noShare,
                    sellFromCompany:companyData[i].name,
                    time:time,
                    symbol:companyData[i].symbol
                }
            /*push transaction object to transaction file*/
                transactionData.push(transaction)
                let val=JSON.stringify(transactionData)
                fs.writeFileSync('transaction.json',val)
            }
        }
}


    console.log(companyData)
    console.log(custDetails)
    fs.writeFileSync('companyshare.json',JSON.stringify(companyData))
    fs.writeFileSync('custdata.json',JSON.stringify(custDetails))
}
    else
    {
    console.log("Please enter valid user")
    }
}
//to sell share
toSell(user,noShare,compSymbol)
{
    let time = new Date()
    //checking share of user is less than he want
    if(noShare<=custDetails[user].share)
    {
        for(let i=0;i<companyData.length;i++)
        {
            //finding the company and increase share
            if(companyData[i].symbol==compSymbol)
            {
                companyData[i].share=companyData[i].share+noShare
                custDetails[user].share-=noShare
                custDetails[user].amount+=companyData[i].price*noShare

                

                let transaction={
                    seller:custDetails[user].name,
                    noOfShare:noShare,
                    sellToCompany:companyData[i].name,
                    time:time,
                    symbol:companyData[i].symbol
                }
                transactionData.push(transaction)
                let val=JSON.stringify(transactionData)
                fs.writeFileSync('transaction.json',val)

            }
        }
        console.log(companyData)
        console.log(custDetails)
        fs.writeFileSync('companyshare.json',JSON.stringify(companyData))
        fs.writeFileSync('custdata.json',JSON.stringify(custDetails))
    }
    else
    {
        console.log("you dont have that much share to sale")
    }

    
}
}
module.exports={CDP}



// try{
//     let format = /^[a-zA-Z]+$/;


  /*validating name*/
//   if(format.test(user)==false)throw "User must be string"


// }catch(e)
// {
//     return e
// }