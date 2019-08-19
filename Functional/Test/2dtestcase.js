const assert=require('chai').assert;

const twoDArray=require('../2Darray').two_d_array;

console.log(twoDArray);
describe("check two-dimensional array condition",function(){

    it("Row and Column should be integer",function(){
        assert.isNumber(twoDArray[0] && twoDArray[1]);
        
    });

    it("Row and Column are not integer",function(){
        assert.isNotNumber(twoDArray[0] && twoDArray[1],"is not have number value");
        
    });

     it("Row should be greater than or equals to 2",function(){
         assert.isTrue(twoDArray[0] >=2, 'minimum 2 row is require for 2D array ');
     });

      it("check all of these are array",function(){
          assert.isArray(twoDArray[2],"Array of integer");
          assert.isArray(twoDArray[3],"Array of double");
          assert.isArray(twoDArray[4],"Array of boolean");
      });
})