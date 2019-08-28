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
        this.size=0
    }
    // pushing the the element in the linked list
    push(data)
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

    printList(){
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

    pop()
    {
        if(this.isEmpty())
        {
            console.log('Sorry..List  is Empty')
        }
        else{
        let current= this.head
        if(this.size==1)
        { 
            let popedValue=current.data
            this.head=null
            return popedValue
        }
        else
        {
        while(current.next.next!=null)
        {
            
            current=current.next
        }
        let popedValue=current.next.data
        current.next=null
        this.size=this.size-1
        return popedValue
        }
    }
    }

    //If list is empty..
    isEmpty()
    {
        if(this.head==null)
        {
            return 1
        }
    }

    //size of linked list

    listSize()
    {
        console.log(this.size)
    }
}
module.exports={LinkedList}