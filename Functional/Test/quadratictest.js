var assert=require('chai').assert
var result=require('../Quadratic')

describe('Positive Test cases..',function(){

    it('Input is number..',function(){
        assert.isNumber(result[0] && result[1] && result[2],"Test case passed")

    });

    it('Output  is not null.....',function(){
        assert.isNotNull(result[3],"Result should not be null..")
    });

    it('Greater than zero.....',function(){
        assert.isAbove(result[0] && result[1] && result[2],0,"a b c mustbe greater than 0..")
    });
})

describe('Negative Test Cases...',function(){
    it('Input not be string..',function(){
        assert.isNotString(result[0] && result[1] && result[2],"Invalid")

    });
})