var assert=require('chai').assert
var square1=require('../square').sq
var result=square1()
describe('square function',function(){
    it('Square is',function(){
        assert.equal(result[1],36)
    })
    
})
