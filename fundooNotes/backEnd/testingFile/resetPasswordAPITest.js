const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const fs=require("fs");

let testObject=fs.readFileSync("/home/administrator/Desktop/Bridgelab/fundooNotes/backEnd/testingFile/testingObjects.json");
let testData=JSON.parse(testObject);
const resetPasswordData=testData.resetPasswordTest;


chai.use(chaiHttp);

let should = chai.should();

describe("This is for reset password", () => {
/*****
 * @description-This test case is for reset password with empty password.
 ****/
    it("It should not POST reset password because of empty password", (done) => {
      chai.request(server)
          .post("/resetPassword")
          .send(resetPasswordData.emptyPassword)  
          .set(testData.tokenSet)//change the token at everytime
          .end((err, res) => {
                res.should.have.status(422);
            done();
          });
    });
/*****
 * @description-This test case is for forgot password because password length is less.
 ****/
it("It should not POST reset password because of password length is", (done) => {
       
    chai.request(server)
        .post("/resetPassword")
        .send(resetPasswordData.passwordLength)
        .set(testData.tokenSet)//change the token at everytime
        .end((err, res) => {
              res.should.have.status(422);
          done();
        });
  });
/*****
 * @description-This test case is for forgot password with empty email.
 ****/
it("It should POST reset password successfull..", (done) => {
       
    chai.request(server)
        .post("/resetPassword")
        .send(resetPasswordData.resetPassword)
        .set(testData.tokenSet)  //change the token at everytime
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  });
});