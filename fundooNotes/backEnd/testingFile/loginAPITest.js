//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const fs=require('fs')

let testObject=fs.readFileSync('/home/administrator/Desktop/Bridgelab/fundooNotes/backEnd/testingFile/testingObjects.json')
let testData=JSON.parse(testObject)
const loginTestData=testData.loginTest;

chai.use(chaiHttp);

let should = chai.should();

/*****
 * @description-This test case is for login with empty creadential
 ****/
describe('/login', () => {
    it('It should not POST login because empty field', (done) => {
       
      chai.request(server)
          .post('/login')
          .send(loginTestData.emptyLogin)
          .end((err, res) => {
                res.should.have.status(422);
            done();
          });
    }); 
/*****
 * @description-This test case is for successful login
 ****/
    it('It should  POST login successful..!!!', (done) => {
       
        chai.request(server)
            .post('/login')
            .send(loginTestData.successfulLogin)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      }); 
/*****
 * @description-This test case is for empty email.
 ****/
it('It should  not POST login because email is empty', (done) => {
       
    chai.request(server)
        .post('/login')
        .send(loginTestData.emptyEmail)
        .end((err, res) => {
              res.should.have.status(422);
          done();
        });
  }); 
/*****
 * @description-This test case is for invalid email.
 ****/
    it('It should  not POST login because email is invalid', (done) => {
       
    chai.request(server)
        .post('/login')
        .send(loginTestData.invalidEmail)
        .end((err, res) => {
              res.should.have.status(422);
          done();
        });
  }); 
/*****
 * @description-This test case is for password field is empty.
 ****/
  it('It should  not POST login because password is empty', (done) => {
       
    chai.request(server)
        .post('/login')
        .send(loginTestData.emptyPassword)
        .end((err, res) => {
              res.should.have.status(422);
          done();
        });
  }); 
/*****
 * @description-This test case is for password length is less than six.
 ****/
it('It should  not POST login because password length is less than six', (done) => {
       
    chai.request(server)
        .post('/login')
        .send(loginTestData.passwordLength)
        .end((err, res) => {
              res.should.have.status(422);
          done();
        });
  }); 

  it('It should  POST login because  email or password  matched', (done) => {
       
    chai.request(server)
        .post('/login')
        .send(loginTestData.credentialMatched)
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  }); 
  it('It should  NOT POST login because  email is wrong', (done) => {
       
    chai.request(server)
        .post('/login')
        // .send(loginTestData.credentialMatched)
        .send(loginTestData.emailWrong)
        .end((err, res) => {
              res.should.have.status(500);
          done();
        });
  }); 
  it('It should NOT POST login because  password is wrong', (done) => {
       
    chai.request(server)
        .post('/login')
        // .send(loginTestData.credentialMatched)
        .send(loginTestData.passwordWrong)
        .end((err, res) => {
              res.should.have.status(500);
          done();
        });
  }); 
});