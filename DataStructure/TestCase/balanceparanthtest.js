const assert=require('chai').assert;
 const testdata=require('../stack/expression')

 describe("positive test case for balancedParentheses",function(){

    it("user responce sholud contain something",function(){
        assert.isNotNull(testdata[0],"express in proper format ")
    })

    it("stack should create object ",function(){
        assert.isObject(testdata[1],"it's object")
    })

    it("user expression should convert into array",function(){
        assert.isArray(testdata[2],"it's array")
    })
 });

 describe("negative test case for balancedParentheses",function(){

    it("user give wrong expression",function(){
        assert.notMatch(testdata[0],/^[a-z0-9A-Z+-/%*(){}\[\]]+$/,"not match with proper format")
    })

    it("user not giving response",function(){
        assert.isNull(testdata[0],"response needed")
    })

    it("expression not convert into array",function(){
        assert.isNotArray(testdata[2],"it's not array")
    })

    it("user response not string",function(){
        assert.isNotString(testdata[0],"user giving wrong number")
    })

    it("stack class not create object",function(){
        assert.isNotObject(testdata[1],"stack not created")
    })
 });