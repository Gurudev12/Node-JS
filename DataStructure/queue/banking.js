let input=require('readline-sync')
let utility=require('../queue/bankingutility')
let ob=new utility.Queue()
function BankingQueue()
{
try{
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

    return [cashAmount,queueSize,ch]
    } catch (err) {

    }
}
module.exports=BankingQueue()
