/******************************************************************************
 *  
 *  @Purpose: address book manager call all address book methods.
 *
 *  @author  Gurudev Murkar
 *  @version 1.0
 *  @since   29-08-2019
 *
 ******************************************************************************/
let input=require('readline-sync')
let fs=require('fs')
//creating object of AddressBook class
let addressBook=require('../Address Book/AddressBook')
let bookMethod=new addressBook.AddressBook()
console.log("main1")
//creating object of json
let address=fs.readFileSync("/home/administrator/Desktop/Bridgelab/OOPs concept/Address Book/address.json")
console.log("main")
let addressData  =JSON.parse(address)   //storing json file to variable addressData

function manager()
{
    let returnName
    let fname,lname,address,city,state,zip,phonenumber
let choice=0
    do
    {
        console.log("*****Address Book******")
        console.log("\n1.Add person data"+"\n2.Edit person data"+"\n3.delete person data"+""+"\n4.Sort by last name"+"\n5.Sort by Zip code"+"\n6.Display all records"+"\n7.Save File")
        console.log("Enter your choice")
         choice=input.questionInt()

        switch(choice)
        {
            case 1:
                returnName= bookMethod.addPerson(addressData)   //passing json file
                
               fname=returnName[0]
               lname=returnName[1]
               address=returnName[2]
               city=returnName[3]
               state=returnName[4]
               zip=returnName[5]
               phonenumber=returnName[6]
               
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
               let deleteResponce=bookMethod.deletePerson(addressData)
               if(deleteResponce !=-1)
               {
                    console.log("Your data deleted sucessfully")
               }
                break;
            
            case 4:
                bookMethod.sortByLastName(addressData)
                break;

            case 5:
                bookMethod.sortByZipCode(addressData)
                break;
            
            case 6:
                bookMethod.displayRecord(addressData)
                break;
            case 7:
                bookMethod.saveFile()
                break;

            default:
                console.log("Sorry....Please enter valid input")
        }

    }while(choice>1)
    console.log(fname)
    console.log(lname)
    return[returnName,fname,lname,address,city,state,zip,phonenumber]
}
module.exports=manager()














































/*
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
                    console.log("Enter first name")
                    var fname = input.question()
                    addressData.addPerson(addressData)   //passing json file
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
               let deleteResponce=bookMethod.deletePerson(addressData)
               if(deleteResponce !=-1)
               {
                    console.log("Your data deleted sucessfully")
               }
                break;
            
            case 4:
                bookMethod.sortByLastName(addressData)
                break;

            case 5:
                bookMethod.sortByZipCode(addressData)
                break;
            
            case 6:
                bookMethod.displayRecord(addressData)
                break;
            case 7:
                bookMethod.saveFile()
                break;

            default:
                console.log("Sorry....Please enter valid input")
        }

    }while(choice==1)
    return [fname]
}
module.exports=manager()
*/