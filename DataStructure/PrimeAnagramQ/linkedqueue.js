class Node
{
    constructor(data,next=null)
    {
    
        this.data=data
        this.next=next
    }
} 

class LinkedList
{
    constructor()
    {
        this.head=null
        let size=0
    }

    

    //Insert Element at Last
    push(data)
    {
       let node=new Node(data)
        let current
    //Check List is Empty
        if(!this.head)
        {
            this.head=node
        }
        else
        {
            current=this.head
            while(current.next)
            {
                current=current.next
            }
            current.next=node
           
        }
       
        this.size++
    }

    //To pop data
    pop()
    {
        if(this.isEmpty())
        {
            console.log("Sorry....List is empty")
        }
        let current=this.head
        let popvalue=current.data
        this.head=current.next
        return popvalue
    }

    //isEmpty checking
    isEmpty()
    {
       if(this.head==null)
       {
       return 1
       }
    }

    //Print the LinkedList Data
    printList()
    {
      var current =this.head

       while(current)
       {
           console.log(current.data)
           current=current.next
       }
    }
}
module.exports={LinkedList}