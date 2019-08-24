class Queue
{
    constructor()
    {
        this.front=-1
        this.rear=-1
        this.queue = new Array()
    }

    // Enter new Elemnt into queue
    enqueue(element)
    {
        console.log("enquuuuuuuuuuuuuuuuuuuuuu")
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
        console.log("Deeeeeeeeeeeeeeeeeeeeeee")
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
    

    // add at rear position
    addRear(element)
    {
        this.rear=this.rear+1
        this.queue[this.rear]=element
    }
    

    // add at front position
    addFront(element)
    {
        for(let i=this.rear;i>=this.front;i--)
        {
            this.queue[i+1]=this.queue[i]
        }
        this.queue[this.front]=element
        this.rear=this.rear+1
    }


    // remove element from front in queue

    removeFront()
    {
        let element=this.queue[this.front]
        this.front=this.front+1
        console.log("remove from front")
        return element
    }

    removeRear()
    {
        let element=this.queue[this.rear]
        this.rear=this.rear-1
        console.log("Remove from rear")
        return element
    }
}

let ob=new Queue()
let input=require('readline-sync')
console.log("Enter Your String:")
let str=input.question()

let array=str.split('')
console.log(array)
let len =array.length
for(let i=0;i<array.length;i++)
{
    ob.enqueue(array[i])
    
}

let flag=1;
for(let i=0;i<Math.floor(len/2);i++ )
{
    
    let first,second;
    first=ob.removeFront();
    second=ob.removeRear();
    if(first!=second)
    {
        flag=0
        break;
    }
   
 
}
if(flag==0)
{
    console.log("Not palindrome")
}
else
{
    console.log("Palindrom")
}
ob.printQueue()