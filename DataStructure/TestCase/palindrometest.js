const assert = require("chai").assert;
const testData = require('../Palindrome/palindrome')

describe("positive test case for palindrom checker", function () {

    it("should create dequeue object", function () {
        assert.isObject(testData[0])
    })

    it("user response should be string", function () {
        assert.isString(testData[1])
    })

    it("it should be array", function () {
        assert.isArray(testData[2])
    })
});

describe("negative test case for palindrom checker", function () {

    it("object is empty", function () {
        assert.isNull(testData[0])
    })

    it("user responce not given or its number", function () {
        if (assert.isNull(testData[1])) {
            console.log("user response is not given")
        } else {
            assert.isNumber(testData[1])
        }
    })

    it("array not created", function () {
        assert.isNotArray(testData[2])
    })

});