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
        console.log("***********************************")
        this.top=this.top+1
        this.stack[this.top]=x
    }
    //Pop operation
    pop(y)
    {
        console.log("@####################")
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
    isEmpty()
    {
        
        if(this.top==-1)
        {
            
            return true
        }
        else 
        {
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5")
            return false
        }
    }
}

console.log("Enter Expression:")
let expression=input.question()


console.log("Enput Expression is:")
exp=expression.toString().split("")

console.log(exp)

let ob= new Stack()
let flag=0
for(let i=0;i<exp.length;i++)
{
    if(exp[i]=='(' || exp[i]=='{' || exp[i]=='[' )
    {
       ob.push(exp[i])
    }
    else if(exp[i]==')' || exp[i]=='}' || exp[i]==']')
    {
        if(ob.isEmpty())
        {
            flag=1
        }
        else
        {
        ob.pop(exp[i])
        }
    }   

}
let value=ob.isEmpty()

if(value==true && flag!=1)
{
    console.log("balanced")
}
else
{
    console.log("Not Balanced")
}