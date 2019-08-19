var assert=require('chai').assert
var out=require('../Distance').Distance;
var result=out()
describe('Positive ',function(){
    it("Entered inputs are numbers", function () {
        assert.isNumber(result[0] && result[1], "Entered x y inputs should be numbers")
    });

    it('Output is correct',function(){
        assert.equal(result[2],6.4031242374328485,"Enter 4 and 5")
    })

   
})

