class Encapsulation
{
     setHeight(hgt)
    {
        this.height=hgt
    }

    getHeight()
    {
        // return this.height
        console.log(this.height)
    }
}

ob=new Encapsulation()
ob.setHeight(6)
let height=ob.getHeight()

ob.setHeight(300)
ob.getHeight()
