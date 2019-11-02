const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
chai.use(chaiHttp);

chai.should();

let testData = require('../testJsonFile/test.json')

 let deleteNoteTestData=testData.deleteNoteTest;


 describe("Note", () => {
    it("It should should post because of valid field", (done) => {
       
      chai.request(server)
          .post("/createNote")
          .send(deleteNoteTestData.deleteNote)
          .set(testData.tokenSet)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    }); 
});
