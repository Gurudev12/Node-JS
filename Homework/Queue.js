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

module.exports={Queue}