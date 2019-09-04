class Mobile
{
    constructor(name,model,price)
    {    
       this.name=name
       this.model=model
       this.price=price
    }
    displayMobile(name,model,price)
    {
    console.log(name)
    console.log(model)
    console.log(price)
    console.log(this.color)
    
    }
}
Mobile.prototype.color="blue"
let  obj=new Mobile()
obj.displayMobile("oppo",101,100000)
console.log("********************************")

let  obj2=new Mobile()
obj2.displayMobile("vivo",201,120000)

console.log("*******************")
let ob=new Mobile()
ob.displayMobile("Nokia",301,15000)

