/******************************************************************************
 *  
 *  @Purpose: Person class contain getter and setter methods
 *
 *  @author  Gurudev Murkar
 *  @version 1.0
 *  @since   29-08-2019
 *
 ******************************************************************************/
class Person
{
    constructor()
    {
        this.firstName=""
        this.lastName=""
        this.address=""
        this.phoneNumber=""
    }
    //set first name
    setName(name)
    {
        this.firstName=name
    }
    getName()
    {
       return this.firstName;
    }

    //set last name
    setLastName(lastName)
    {
        this.lastName=lastName;
    }
    getLastName()
    {
        return this.lastName;
    }

    
    //set address
    setAddress(addressOfUser)
    {
        this.address=addressOfUser;
    }
    getAddress()
    {
        return this.address;
    }
    
    //set and get phone number
    setPhoneNumber(number)
    {
        this.phone=number;
    }

    getPhoneNumber()
    {
        return this.phone;
    }



}
module.exports={Person}