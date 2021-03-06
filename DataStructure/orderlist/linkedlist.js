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
    insertAdd(data)
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
    //Print List
    printListData()
    {
    let current =this.head
    let str=new Array()
    let count=0
       while(current!=null)
       {
           str[count]=current.data
           current=current.next
           count++
       }
       return str
    }



    //Searching Element Method
    searchElement(key)
    {
        let current=this.head
        while(current)
        {
            if(current.data==key)
            {
                return true
            }
            current=current.next

        }
        return false
    }

    //Search Index
    findLocation(key)
    {
        let index=0
        let current=this.head
        while(current)
        {
            if(current.data==key)
            {
                return index
            }
            index++
            current=current.next

        }
        return false
    }

    //Remove List Element
   /* removeAt(data)
    {
    let current=this.head
     if(current.next==null)
     {
         return head
     }
     else
     {
         while(current.next!=null)
         {
             current=current.next
         }
         current=current.next
         this.size--
     }   
     
    }*/
    //Insert at appropriate position

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
        

        let privious
        let current=this.head
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

    //remove from index
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
    /*appropriatePosition(key)
    {
        let current=this.head
        let str=new Array()
        let index=0
        while(key<current.data)
        {
            str[index]=current.data
            index++
            current=current.next
        }
        
        for(let i=0;i<str.length;i++)
        {
            while(key<str[i])
            {

            }
        }
        
    }*/

}
module.exports={LinkedList}