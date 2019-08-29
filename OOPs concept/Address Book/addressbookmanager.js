let input=require('readline-sync')
let fs=require('fs')
//creating object of AddressBook class
let addressBook=require('../Address Book/AddressBook')
let bookMethod=new addressBook.AddressBook()

//creating object of json
let address=fs.readFileSync('address.json')
let addressData  =JSON.parse(address)   //storing json file to variable addressData
function manager()
{
let choice
    do
    {
        console.log("*****Address Book******")
        console.log("\n1.Add person data"+"\n2.Edit person data"+"\n3.delete person data"+""+"\n4.Sort by last name"+"\n5.Sort by Zip code"+"\n6.Display all records"+"\n7.Save File")
        console.log("Enter your choice")
         choice=input.questionInt()

        switch(choice)
        {
            case 1:
                bookMethod.addPerson(addressData)   //passing json file
                console.log("Add person sucessfully..")
                break;
            
            case 2:
                let responce=bookMethod.editInfo(addressData)
                if(responce==-1)
                    console.log("person data is not found")
                else
                    console.log("person data is suceesfully updated")
                break;

            case 3:
                bookMethod.deletePerson()
                break;
            
            case 4:
                bookMethod.sortByName()
                break;

            case 5:
                bookMethod.sortByZipCode()
                break;
            
            case 6:
                bookMethod.displayRecord()
                break;
            case 7:
                bookMethod.saveFile()
                break;

            default:
                console.log("Sorry....Please enter valid input")
        }

    }while(choice==1)
}
module.exports=manager()