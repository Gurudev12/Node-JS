const fs=require('fs')
const assert=require('chai').assert
const result=require('../../OOPs concept/clinicmanagement/clinicdashboard')


describe("test case for Doctor ",function(){
    it("doctordetails is array",function(){
        assert.equal(result[0],"doctordetails is array");
    })

    it("doctor name should string",function(){
        assert.equal(result[1],"doactor name should be in string format");
    })

    it("doctor name  should be string",function(){
        assert.isNotString(result[1],"doctordetails is array");
    })

    it("doctor name not should be string",function(){
        assert.isString(result[1],"doctordetails is array");
    })



    it("doctor specialization should string",function(){
        assert.equal(result[2],"specialization should be in string format");
    })

    it("doctor specialization should be string",function(){
        assert.isNotString(result[2],"doctor specialization should be string");
    })

    it("doctor specialization not should be string",function(){
        assert.isString(result[2],"doctorspecialization not should be string");
    })
    
    it("doctor availability should AM or PM",function(){
        assert.equal(result[3],"please enter AM or PM");
    })

    it("doctor availability should be string",function(){
        assert.isNotString(result[3],"doctor specialization should be string");
    })

    it("doctor availability not should be string",function(){
        assert.isString(result[3],"doctorspecialization not should be string");
    })
})