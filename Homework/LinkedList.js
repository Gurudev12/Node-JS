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

    //Insert Element at First
    insertFirst(data)
    {
        this.head=new Node(data,this.head)
        this.size++
    }

    //Insert Element at Last
    insertLast(data)
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

    //Insert Element at Index
    insertAt(data,index)
    {
        let node=new Node(data)
        if(index>0 && index>this.size)
        {
            return;
        }
        if(index===0)
        {
          let head= new Node(data,this.head)
        }
        

        let privious,current
        current=this.head
        let count=0

        while(count<index)
        {
            privious=current
            count++
            current=current.next
           
        }
        privious.next=node
        node.next=current

    }

    //Get  At Index position value..
    getAt(index)
    {
       let count=0
       let current=this.head
        while(current)
        {
            if(count==index)
            {
                console.log("Element Present is .."+current.data)
            }
            current=current.next
            count++
        }
    }
    //Remove at Index
    removeAt(index)
    {
        if(index>0 && index>this.size)
        {
            return
        }
        let current=this.head
        let previous,count=0
        if(index===0)
        {
            this.head=current.next
        }
        else
        {
            while(count<index)
            {
                previous=current
                current=current.next
                count++
            }
            previous.next=current.next

        }
       
    }
    //clear linked list
    clearList()
    {
        this.head=null
       this.size=0
    }

    //Print the LinkedList Data
    printListData()
    {
      var current =this.head

       while(current)
       {
           console.log(current.data)
           current=current.next
       }
    }

}

// let ob=new LinkedList()
// ob.insertFirst(20)
// ob.insertFirst(30)
// ob.insertFirst(40)
// ob.insertFirst(50)

// ob.insertLast(10)
// ob.insertFirst(60)
// ob.insertAt(100,4)
// ob.printListData()

// ob.getAt(3)
// ob.removeAt(1)
// /*ob.clearList()*/
// ob.printListData()
module.exports={LinkedList}



















/*let n1=new Node(50)
console.log(n1)*/