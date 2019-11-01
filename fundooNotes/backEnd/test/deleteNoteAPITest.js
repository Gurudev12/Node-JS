const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const fs=require("fs");
chai.use(chaiHttp);

let should = chai.should();

let testObject=fs.readFileSync("./test.json");
let testData=JSON.parse(testObject);
 let deleteNoteTestData=testData.deleteNoteTest;
console.log("DTETTETE DATA",deleteNoteTestData.deleteNote);


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
