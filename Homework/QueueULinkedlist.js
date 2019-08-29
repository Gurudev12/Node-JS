class Node
{
    constructor(data,next=null)
    {
        this.data=data
        this.next=next
    }
}
class QueueLinkedList
{
    constructor()
    {
        this.head=null
        this.size=0
    }
    // pushing the the element in the linked list
    enqueue(data)
    {
        let node = new Node(data)
        if(this.head==null)
        {
            this.head=node
        }
        else{
            let current=this.head
            while(current.next!=null)
            {
                current=current.next
            }
            current.next=node
        }
        this.size=this.size+1
    }

    //printing the list

    printQueueList(){
        if(this.isEmpty())
        {
            console.log('List Empty')
        }
        else{
        let current=this.head
        while(current)
        {
            console.log(current.data)
            current=current.next
        }
    }
    }

    dequeue()
    {
        if(this.isEmpty())
        {
            console.log('List Empty')
        }
        else{
        let current=this.head
        let popValue=current.data
        this.head=current.next
        return popValue
        }
    }
    //checking queue is empty
    isEmpty()
    {
        if(this.head==null)
        {
            return 1
        }
    }
    //Clearing the list
    clearList()
    {
        this.head=null
       this.size=0
    }
    //sorting the queue
    sortQueueList()
    {
      let  current=this.head
       let i= this.head,j

       for(i=current;current.next!=null;i++)
       {
           for(j=i.next;j<current.next!=null;j++)
           {
               if(i.data>j.data)
               {
                   let temp=i.data
                   i.data=j.data
                   j.data=temp
               }
           }
       }

    }




    //size of linked list

    listSize()
    {
        console.log(this.size)
    }
}
module.exports={QueueLinkedList}