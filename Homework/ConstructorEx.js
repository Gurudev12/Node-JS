class Demo
{

    constructor(value1,value2)
    {
        this.value1=value1*2
        this.value2=value2*2
        this.print=2*this.value1
        console.log(this.print)
        console.log(" value "+value1 + " "+value2)

    }
    toDisplaySq(value1,value2)
    {
        this.out=this.value1*this.value2
        console.log(this.out)
    }

}
let ob=new Demo(10,30)
ob.toDisplaySq()