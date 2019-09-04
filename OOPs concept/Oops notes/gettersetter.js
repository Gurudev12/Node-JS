class Student
{
    constructor()
    {
    this.fname=""
    this.lname=""
    }
    setName(name)
    {
        this.name=name
    }
    getName()
    {
    return this.name
    }
    setLastName(lname)
    {
        this.lname=lname
    }
    getLastName()
    {
        return this.lname
    }
}

let ob=new Student()
ob.setName("Gurudev")
let name=ob.getName()
console.log(name)

ob.setLastName("Murkar")
let lastName=ob.getLastName()
console.log(lastName)










// class Encapsulation
// {
//      setHeight(hgt)
//     {
//         this.height=hgt
//     }

//     getHeight()
//     {
//          return this.height
  
//     }
// }

// ob=new Encapsulation()
// ob.setHeight(6)
// let height=ob.getHeight()
// console.log(height)

// ob.setHeight(300)
// let output=ob.getHeight()
// console.log(output)


