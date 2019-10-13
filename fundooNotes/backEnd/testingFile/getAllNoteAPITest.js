const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const fs=require("fs");

let testObject=fs.readFileSync("/home/administrator/Desktop/Bridgelab/fundooNotes/backEnd/testingFile/testingObjects.json");


let testData=JSON.parse(testObject);

chai.use(chaiHttp);

let should = chai.should();

describe("Negative Test case For getting all notes", () => {
    it("It should not POST because of token is invalid", (done) => {
       
      chai.request(server)
          .get("/getAllNote")
          .set(testData.invalidToken)
          .end((err, res) => {
                res.should.have.status(400);
            done();
          });
    }); 
});


describe("Positive test case For getting all notes", () => {
    it("It should  POST because token is valid", (done) => {
       
      chai.request(server)
          .get("/getAllNote")
          .set(testData.tokenSet)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    }); 
});
