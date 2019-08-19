var assert=require('chai').assert
var result=require('../WindChill')

describe("Positive testing for WindChill.js", function () {

    /**************************************************************************************
    * @description - This testcase is used for ensuring input elements are numbers 
    * @returns     - True or false 
    */

    it("Entered inputs are numbers", function () {
        assert.isNumber(result[0] && result[1], "Entered inputs should be numbers")
    });
    /***************************************************************************************/

    /**************************************************************************************
    * @description - This testcase is used for ensuring input elements are not strings 
    * @returns     - True or false 
    */

    it("Entered inputs are not alphabets", function () {
        assert.isNotString(result[0] && result[1], "Entered inputs are not strings")
    });
    /************************************************************************************ */

    /**************************************************************************************
    * @description - This testcase is used for ensuring temperature doesnt exceed 50 
    * @returns     - True or false 
    */

    it("Temperature must be less than 50 !", function () {
        assert.isBelow(result[0], 50, "Temperature must be less than 50 !")
    })
    /************************************************************************************** */

    /**************************************************************************************
    * @description - This testcase is used for ensuring wind is in the range 3-120 
    * @returns     - True or false 
    */

    it("Wind must be greater than 3", function () {
        assert.isAbove(result[1], 3, "Wind must be greater than 3")
    })
    it("Wind must be less than 120", function () {
        assert.isBelow(result[1], 120, "Wind must be less than 120")
    })
    /************************************************************************************** */

    /**************************************************************************************
    * @description - This testcase is used for ensuring output is an array 
    * @returns     - True or false 
    */

    it("Generated output must be a number", function () {
        assert.isNumber(result[2], "Output should be a number")
    });
    /************************************************************************************* */

    /**************************************************************************************
    * @description - This testcase is used for ensuring output is not null 
    * @returns     - True or false 
    */

    it("Generated output must be not be null", function () {
        assert.isNotNull(result[2], 'Generated output must be not be null');
    });
    /************************************************************************************ */
})



describe("Negative testing for WindChill.js", function () {
    /**************************************************************************************
    * @description - This testcase is used for ensuring input elements are not numbers 
    * @returns     - True or false 
    */

    it("Entered inputs are not numbers", function () {
        assert.isNotNumber(result[0] && result[1], "Entered inputs should not be numbers")
    });
    /*********************************************************************************** */

    /**************************************************************************************
    * @description - This testcase is used for ensuring input elements are strings 
    * @returns     - True or false 
    */

    it("Entered inputs are alphabets", function () {
        assert.isString(result[0] && result[1], "Entered inputs are strings")
    });
    /************************************************************************************ */

    /**************************************************************************************
   * @description - This testcase is used for ensuring output is not an array 
   * @returns     - True or false 
   */

    it("Generated output must not be a number", function () {
        assert.isNotNumber(result[2], "Output should not be a number")
    });
    /*********************************************************************************** */

    /**************************************************************************************
    * @description - This testcase is used for ensuring output is null
    * @returns     - True or false 
    */
    it("Generated output must be null", function () {
        assert.isNull(result[2], 'Generated output must be a null');
    });
    /********************************************************************************* */
})
