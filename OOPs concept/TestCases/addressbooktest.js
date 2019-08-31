

const assert = require('chai').assert;
const fs=require("fs");
/** require address book class */
const address = require('../../OOPs concept/Address Book/addressbookmanager');

describe(" test cases for Add person data", function () {   /** calling method */
    
    
    it("Return data array not null", function () {
        assert.isNotNull(address[0], "Return type should be array")
    })

    
    it("Return type is aaray", function () {
        assert.isArray(address[0],"It should array")
    })

    it("first name is string ", function () {
        assert.isNotString(address[0], "first name should be string ");
    })

    it("last name is string", function () {
        assert.isString(address[2], "firstname is string")
    })
    
    
});

describe(" Negative test cases", function () {

    it("name should be string", function () {
        assert.equal(address[1], "name should be in string format")
    })

    it("last name should be string", function () {
        assert.equal(address[2], "last name should be in string format")
    })

    it("city name should be string", function () {
        assert.equal(address[2], "city name should be in string format")
    })

    it("city name should be string", function () {
        assert.equal(address[2],"state  should be in string format")
    })
    it("Phone number should be integer", function () {
        assert.equal(address[7],"phone number not in proper format")
    })
    

})
