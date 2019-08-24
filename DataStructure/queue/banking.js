let input=require('readline-sync')
let utility=require('../queue/bankingutility')
let ob=new utility.Queue()
function BankingQueue()
{
    let ch,empty
    console.log("Enter total cash amount in bank:")
    let cashAmount=input.questionInt()

    console.log("Enter total number of people in queue:")
    let queueSize=input.questionInt()

    if(queueSize!=0)
    {
        for(let i=0;i<queueSize;i++)
        {
            ob.enqueue(i)
        }
    do
    {
        
        console.log(".......Banking Cash Counter..........")
        console.log("1.Deposit")
        console.log("2.Withdraw")
        console.log()
        console.log("Enter your choice:")
        ch=input.question()

        switch(ch)
        {
            case '1':
                console.log("Enter amount to Deposit:")
                let depositAmount=input.questionInt()
                cashAmount=cashAmount+depositAmount
                break;

            case '2':
                console.log("Enter amount to Withdraw:")
                let withdrawAmount=input.questionInt()
                if(withdrawAmount<=cashAmount)
                {
                cashAmount=cashAmount-withdrawAmount
                }
                else
                {
                    console.log('Sorry....Less cashed balanced')
                }
                break;


            default:
                console.log("You Entered wrong choice")
                break;
                
        }
        empty=ob.isEmpty()
        ob.dequeue()
        console.log("Total Balance:"+cashAmount)
        console.log("**********************************")
    }while(empty!=true)
    }
    console.log("Total Balance:"+cashAmount)
        console.log("**********************************")
}
module.exports=BankingQueue()





/*const Util=require('../queue/bankingutility')
const input=require('readline-sync')
let queueObj= new Util.Queue()
function cashCounter()
{
    console.log('Enter the total amount of cash in the bank')
    let cashBalanced=input.questionInt()
    console.log('Enter total no of people in queue')
    let queueSize=input.questionInt() 
    let empty
    if(queueSize!=0)
    {
        for(let i=1;i<=queueSize;i++)
        {
            queueObj.enqueue(i)
        }
        do{
            console.log('Press 1 to Withdraw or Press 2 to Deposit')
            let option =input.questionInt()
            //one to withdraw amount
            if(option==1)
            {

                console.log('Enter Amount to be Withdraw')
                let withdrawAmount=input.questionInt()
                if(cashBalanced>=withdrawAmount)
                {
                cashBalanced=cashBalanced-withdrawAmount
                }
                else
                {
                    console.log('Less cashed balanced')
                }

            }
            //if 2 Deposit amount
            else if(option==2)
            {
                console.log('Enter Amount be Deposited')
                let depositAmount=input.questionInt()
                cashBalanced=cashBalanced+depositAmount
            }
            empty=queueObj.isEmpty()
            queueObj.dequeue()
        }while(empty!=true);
    }

console.log('Total Balance Left '+cashBalanced)
}
module.exports=cashCounter()







/*
function BankingQueue()
{
    let ch
    do
    {
        console.log(".......Banking Cash Counter..........")
        console.log("1.Deposit")
        console.log("2.Withdraw")
        console.log("3.Number of people in queue")
        console.log("4.Exit")
        console.log()
        console.log("Enter your choice:")
        ch=input.question()
    }
    while()
    {

    }
}
module.exports=BankingQueue()*/