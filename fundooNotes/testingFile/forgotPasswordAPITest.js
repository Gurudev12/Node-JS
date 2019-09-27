const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../backEnd/server');
const fs=require('fs')

let testObject=fs.readFileSync('/home/administrator/Desktop/Bridgelab/fundooNotes/testingFile/testingObjects.json')
let testData=JSON.parse(testObject)
const forgotPasswordTestData=testData.forgotPasswordTest;


chai.use(chaiHttp);

let should = chai.should();

/*****
 * @description-This test case is for forgot password with empty email.
 ****/
describe('/forgotPassword', () => {
    it('It should not POST forgot password because of empty email', (done) => {
       
      chai.request(server)
          .post('/forgotPassword')
          .send(forgotPasswordTestData.emptyEmail)
          .end((err, res) => {
                res.should.have.status(422);
            done();
          });
    }); 
/*****
 * @description-This test case is for forgot password with invalid email.
 ****/
    it('It should not POST forgot password because of invalid email', (done) => {
       
        chai.request(server)
            .post('/forgotPassword')
            .send(forgotPasswordTestData.invalidEmail)
            .end((err, res) => {
                  res.should.have.status(422);
              done();
            });
      }); 
/*****
 * @description-This test case is for forgot password with empty email.
 ****/
      
      it('It should  POST forgot password because of valid email id', (done) => {
       
        chai.request(server)
            .post('/forgotPassword')
            .send(forgotPasswordTestData.validEmail)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      }); 

});