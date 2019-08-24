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
        return element
    }

    removeRear()
    {
        let element=this.queue[this.rear]
        this.rear=this.rear-1
        return element
    }
}
module.exports={Queue}