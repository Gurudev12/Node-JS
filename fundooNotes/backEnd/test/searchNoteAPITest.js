const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const fs=require("fs");

let testObject=fs.readFileSync("./test.json");

let testData=JSON.parse(testObject);
const searchNote=testData.searchNoteData;
chai.use(chaiHttp);

let should = chai.should();

describe("Negative Test case for search note", () => {
    it("It should not POST because of token is invalid", (done) => {
       
      chai.request(server)
          .post("/searchNote")
          .send(searchNote.searchData)
          .set(testData.invalidToken)
          .end((err, res) => {
                res.should.have.status(400);
            done();
          });
    }); 
});

describe("Positive Test case for search note", () => {
    it("It should  POST because of valid data", (done) => {
       
      chai.request(server)
          .post("/searchNote")
          .send(searchNote.searchData)
          .set(testData.tokenSet)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    }); 
});
