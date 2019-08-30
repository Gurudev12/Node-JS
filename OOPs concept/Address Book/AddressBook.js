let input=require('readline-sync')
let fs=require('fs')
//Creating object of Person  class (personmethods.js)
let util=require('../Address Book/personmethods')
let obPerson=new util.Person()


class AddressBook
{
    //Add new person in the system
    addPerson(addressData)
    {
        console.log("Enter first name")
        let fname=input.question()

        console.log("Enter last name")
        let lname=input.question()

        console.log("Enter address")
        let address=input.question()
        console.log("Enter city")
        let city=input.question()

        console.log("Enter state")
        let state=input.question()

        console.log("Enter zip")
        let zip=input.question()

        console.log("Enter phonenumber")
        let phonenumber=input.questionInt()

        //creating object and add it to the addressData 
        addressData.push (
            {
            "firstname" : fname,
            "lastname" :lname,
            "address" : address,
            "city" :city,
            "state":state,
            "zip":zip,
            "phonenumber":phonenumber
            })
            // fs.writeFileSync('address.json',JSON.stringify(this.addressData))
           this.saveFile(addressData)
    }
    //Editing person information
    editInfo(addressData)
    {
        let flagid=-1
        console.log("Enter user name")
        let userName=input.question()

        console.log("Enter phone number")
        let mobNo=input.questionInt()

        for(let i=0;i<addressData.length;i++)
        {
            if(addressData[i].firstname==userName && addressData[i].phonenumber==mobNo )
            {
                flagid=i
            }
        }
    
        if(flagid==-1)
        {
            console.log("person not found")
            return flagid
        }

        this.display(addressData,flagid)
        console.log("What do you want to edit:")
        console.log("\n1.First name"+"\n2.Last name"+"\n3.Address"+"\n4.Phone number")
        console.log("Enter your choice")
        let choice=input.questionInt()
        switch(choice)
        {
            case 1:
                addressData[flagid].firstname=this.firstNameInput()
                break;


            case 2:
                addressData[flagid].lastname=this.lastNameInput()
                break;

            case 3:
                addressData[flagid].address=this.addressInput()
                break;
            
            case 4:
                addressData[flagid].phonenumber=this.phonenumberInput()
                break;
            
            default:
                console.log("Invalid Input")
        
        }
        this.saveFile(addressData)

        
        
    }

    //displaying person information based on the flagid
    display(addressData,flagid)
    {
        console.log("first name: "+addressData[flagid].firstname)
        console.log("last name: "+addressData[flagid].lastname)
        console.log("address: "+addressData[flagid].address)
        console.log("phonenumber: "+addressData[flagid].phonenumber)
    }

    //tacking name which want to update
    firstNameInput()
    {
        let updatedName, uname
        console.log("Enter name to update")
        uname=input.question()
        obPerson.setName(uname)
        updatedName=obPerson.getName()
        return updatedName
    }
    //tacking last name which want to update
    lastNameInput()
    {
        let updatedLastName
        console.log("Enter your last name to upadate")
        let uLastName=input.question()
        obPerson.setLastName(uLastName)
        updatedLastName=obPerson.getLastName()
        return updatedLastName

    }

    //tacking address which want to update
    addressInput()
    {
        let  updatedAddress
        console.log("Enter address to update..")
        let uAddress=input.question()
        obPerson.setAddress(uAddress)
        updatedAddress=obPerson.getAddress()
        return updatedAddress
    }
    //tacking mobile no to update
    phonenumberInput()
    {
        let  updatedPhoneNumber
        console.log("Enter mobile number to update")
        let uPhoneNumber=input.question()
        obPerson.setPhoneNumber( uPhoneNumber)
        updatedPhoneNumber=obPerson.getPhoneNumber()
        return updatedPhoneNumber
    }

    //saving the updated data to json file
    saveFile(addressData)
    {
        fs.writeFileSync('address.json',JSON.stringify(addressData))
        console.log("Data saved sucessfully...")
    }
    //Deleting respective record
    deletePerson(addressData)
    {
        let i
        console.log("Enter your name:")
        let userName=input.question()
        console.log("Enter phone number:")
        let mobNo=input.questionInt()
        let flagid=-1
        for(i=0;i<addressData.length;i++)
        {
            if(addressData[i].firstname==userName && mobNo==addressData[i].phonenumber)
            {
                flagid=i
            }
        }

        if(flagid==-1)
        {
            console.log("Record is not found which you want to delete")
            return flagid
        }
        //calling display method to display record
        this.display(addressData,flagid)
       //asking user to sure to delete user record
       console.log("Are you sure to delete record")
       console.log("1.Yes"+"\n2.No")
       console.log("Enter your chocice")
       let choice=input.questionInt()

       switch(choice)
       {
           case 1:
               addressData.splice(flagid,1)
               break;
            case 2:
                console.log("Record not deleted")
                break;
            default:
                console.log("You have entered wrong choice..")
                
       }
       this.saveFile(addressData)

    }
    //method for sorting data by last name
    sortByLastName(addressData)
    {
        let i,j,temp
        for(i=0;i<addressData.length;i++)
        {
            for(j=0;j<addressData.length-1;j++)
            {
                if(addressData[j+1].lastname < addressData[j].lastname)
                {
                    temp=addressData[j+1]
                    addressData[j+1]=addressData[j]
                    addressData[j]=temp
                }
            }
        }
        for(i=0;i<addressData.length;i++)
        {
            console.log(addressData[i])
        }
    }
    //Sorting data by zipcode
    sortByZipCode(addressData)
    {
        let i,j,temp
        console.log("your sorted zip codes are..")
        for(i=0;i<addressData.length;i++)
        {
            for(j=0;j<addressData.length-1;j++)
            {
                if(addressData[j+1].zip < addressData[j].zip)
                {
                    temp=addressData[j+1]
                    addressData[j+1]=addressData[j]
                    addressData[j]=temp
                }
            }
        }
        for(i=0;i<addressData.length;i++)
        {
            console.log(addressData[i].zip)
        }
    }
    //Display records of user
    displayRecord(addressData)
    {
        for(let i=0;i<addressData.length;i++)
        {
            console.log(addressData[i])
        }
    }

}
module.exports={AddressBook}