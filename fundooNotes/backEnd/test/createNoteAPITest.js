const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const fs=require("fs");
chai.use(chaiHttp);

 chai.should();

// let testObject=fs.readFileSync("../testJsonFile/test.json");


// let testData=JSON.parse(testObject);
let testData = require('../testJsonFile/test.json')

let createNoteTestData=testData.createNoteTest;


 describe("Note", () => {
    it("It should should post because of valid field", (done) => {
       
      chai.request(server)
          .post("/createNote")
          .send(createNoteTestData.validNote)
          .set(testData.tokenSet)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    }); 
});
