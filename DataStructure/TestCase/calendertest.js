const assert=require('chai').assert;
 const testdata=require('../calender/calender');

 describe("positive test cases for calendar",function(){

    it("month should be given",function(){
        assert.isNotNull(testdata[0]);
    })

    it("month should be integer",function(){
        assert.isNumber(testdata[0])
    })

    it("year should be number",function(){
        assert.isNumber(testdata[1])
    })
 });

 describe("negative test case for calendar",function(){

    it("month greater than 12",function(){
        assert.isAbove(testdata[0],12,"greater than 12")
    })

    it("month and year is not given",function(){
        assert.isNull(testdata[0] && testdata[1],"give month and year")
    })

    it("day return should be between 0 to 6",function(){
        assert.isTrue(testdata[2]>-1 && testdata[2]<7)
    })

    it("month array is empty",function(){
        assert.isNull(testdata[3])
    })

    it("days array is empty",function(){
        assert.isNull(testdata[4])
    })
 });
