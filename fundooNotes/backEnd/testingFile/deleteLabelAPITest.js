const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const fs=require("fs");
chai.use(chaiHttp);

let should = chai.should();

let testObject=fs.readFileSync("./testingObjects.json");
let testData=JSON.parse(testObject);
 let deleteLabelTestData=testData.deleteLabelTest;

 describe("Delete label", () => {
    it("It should Not delete label", (done) => {
       
      chai.request(server)
          .post("/deleteLabel")
          .send(deleteLabelTestData.deleteLabel)
          .set(testData.tokenSet)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    }); 
});
