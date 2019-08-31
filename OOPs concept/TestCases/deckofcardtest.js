const assert = require('chai').assert;

const deckOfCard=require("../../OOPs concept/DeckOfCard/deckofcard")

describe("test case for dect of cards",function(){

    it("random number not generated",function(){
        assert.equal(deckOfCard[2],"random number not generated")
    })

    it("suit not store in array",function(){
        assert.isArray(deckOfCard[0],"suit should store in array")
    })

    it("suit should store in array",function(){
        assert.isNotArray(deckOfCard[0],"suit should store in array")
    })

    it("value  store in array",function(){
        assert.isArray(deckOfCard[1],"value should store in array")
    })

    it("value should store in array",function(){
        assert.isNotArray(deckOfCard[1],"value should store in array")
    })

    it("cards not store in array",function(){
        assert.isArray(deckOfCard[2],"cards should store in array")
    })

    it("cards should store in array",function(){
        assert.isNotArray(deckOfCard[2],"cards should store in array")
    })
})