class Parent
{
    homeName()
    {
        console.log("Aashirvad")
    }
    addressDisplay()
    {
        console.log("Harche")
    }
    displayPAge()
    {
        console.log("Parent age is 45")
    }
}
class Child extends Parent
{
    displayCAge()
    {
        console.log("Child age is 22")
    }
}

let ob=new Child()
let pob=new Parent()
pob.displayPAge()
console.log("*********************")

ob.homeName()
ob.addressDisplay()
ob.displayPAge()
ob.displayCAge()