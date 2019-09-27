const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../backEnd/server');
const fs=require('fs')

let testObject=fs.readFileSync('/home/administrator/Desktop/Bridgelab/fundooNotes/testingFile/testingObjects.json')
let testData=JSON.parse(testObject)
const resetPasswordData=testData.resetPasswordTest;


chai.use(chaiHttp);

let should = chai.should();

describe('This is for reset password', () => {
/*****
 * @description-This test case is for reset password with empty password.
 ****/
    it('It should not POST reset password because of empty password', (done) => {
      chai.request(server)
          .post('/resetPassword')
          .send(resetPasswordData.emptyPassword)
          .set(resetPasswordData.headerWithToken)
          .end((err, res) => {
                res.should.have.status(422);
            done();
          });
    });
/*****
 * @description-This test case is for forgot password because password length is less.
 ****/
it('It should not POST reset password because of password length is', (done) => {
       
    chai.request(server)
        .post('/resetPassword')
        .send(resetPasswordData.passwordLength)
        .set(resetPasswordData.headerWithToken)
        .end((err, res) => {
              res.should.have.status(422);
          done();
        });
  });
/*****
 * @description-This test case is for forgot password with empty email.
 ****/
it('It should POST reset password successfull..', (done) => {
       
    chai.request(server)
        .post('/resetPassword')
        .send(resetPasswordData.resetPassword)
        .set(resetPasswordData.headerWithToken)
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  });
});