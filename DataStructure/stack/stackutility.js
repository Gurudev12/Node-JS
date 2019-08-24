let input=require('readline-sync')

class Stack
{
    constructor()
    {
    this.top=-1
    this.stack=[10]
    }

    //push Opertion

    push(x)
    {
        this.top=this.top+1
        this.stack[this.top]=x
    }
    //Pop operation
    pop(y)
    {
        
        if(this.top==-1)
        {
            console.log("Nothing is present to pop")
            return 
        }
        if(this.stack[this.top]=='(' || this.stack[this.top]=='{' || this.stack[this.top]=='[')
        {
        this.top--
        }

    }
    //Check stack is empty
    isEmpty()
    {
        
        if(this.top==-1)
        {
            
            return true
        }
        else 
        {
            return false
        }
    }
}
module.exports={Stack}