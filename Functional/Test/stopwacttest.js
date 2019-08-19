var assert=require('chai').assert
var out=require('../Stopwatch').Stopwatch
var result=out()
describe('square function',function(){
    it('Square is',function(){
        assert.equal(result[1],36)
    })
    
    it("Entered inputs are not alphabets", function () {
        assert.isNotString(result[0], "Entered inputs are not strings")
    });

})
