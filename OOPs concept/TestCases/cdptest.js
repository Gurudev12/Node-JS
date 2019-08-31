const assert=require('chai').assert
const fs=require("fs");
const result=require('../../OOPs concept/CDP/cdp')
  

describe("Positive Test cases",function(){
   
    it("choice should be number",function(){
        assert.isNotNumber(result[0],"choice should be in number format") ;
    })

    it("choice should not be null",function(){
        assert.isNotNull(result[0],"choice should not be null") ;
    })
})

describe("Negative  Test cases",function(){
   
    it("choice should be number",function(){
        assert.isNumber(result[0],"choice should be in number format") ;
    })

    it("entered symbol should be character", function () {
        assert.equal(address[1], "entered symbol should be character")
    })

    it("user input should number", function () {
        assert.equal(address[2], "user input in number format")
    })
})