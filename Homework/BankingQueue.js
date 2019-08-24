class Queue
{
    constructor()
    {
        this.front=0
        this.rear=-1
        this.queue = new Array()
    }

    // Enter new Elemnt into queue
    enqueue(element)
    {
        this.rear=this.rear+1
        this.queue[this.rear]=element
        this.front=0
    }

    // Printing Queue
    printQueue()
    {
        for(let i=this.front;i<=this.rear;i++)
        {
            console.log(this.queue[i])
        }
    }

    //Deleting elment from queue
    dequeue()
    {
        if(this.isEmpty())
        {
            console.log('Queue is Empty')
        }
        else
        {
        for(let i=this.front;i<this.rear;i++)
        {
            this.queue[i]=this.queue[i+1]
        }
        this.rear=this.rear-1
    }
    }

    //Queue is empty or not
    isEmpty()
    {
        if(this.rear==-1)
        {
            return true
        }
    }
}




let input=require('readline-sync')
function BankingQueue()
{
    let ch,empty

    let ob=new Queue()
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