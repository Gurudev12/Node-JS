//During the test the env variable is set to test

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const fs=require('fs')

let testObject=fs.readFileSync('/home/administrator/Desktop/Bridgelab/fundooNotes/backEnd/testingFile/testingObjects.json')


let testData=JSON.parse(testObject)
const registrationTestData=testData.registrationTest

chai.use(chaiHttp);

let should = chai.should();
/*****
 * @description-this test case will pass all registration field empty
 ****/
describe('/registration', () => {
    it('It should not POST registration because empty field', (done) => {
       
      chai.request(server)
          .post('/registration')
          .send(registrationTestData.emptyRegistration)
          .end((err, res) => {
                res.should.have.status(422);
            done();
          });
    }); 
/*****
 * @description-registration done successfully through this test case but once again you test this
 *              test case you will get an error msg because allready registered data.             
 ****/
    it('It should POST registration done successfully', (done) => {
      chai.request(server)
          .post('/registration')
          .send(registrationTestData.successfulRegistration)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
/*****
 * @description-This test case will throw message that first name is empty.
 ****/
    it('It should not POST regitstration without first name', (done) => {
      chai.request(server)
          .post('/registration')
          .send(registrationTestData.emptyFirstName)
          .end((err, res) => {
                res.should.have.status(422);
            done();
          });
    });

/*****
 * @description-This test case will throw message that first name is invalid.
 ****/
    it('It should not POST regitstration with invalid first name', (done) => {
      chai.request(server)
          .post('/registration')
          .send(registrationTestData.invalidFirstName)
          .end((err, res) => {
                res.should.have.status(422);
            done();
          });
    });

    it('It should not POST regitstration because email is not existed', (done) => {
        chai.request(server)
            .post('/registration')
            .send(registrationTestData.emailNotExist)
            .end((err, res) => {
                  res.should.have.status(500);
              done();
            });
      });

it('It should not POST regitstration because email allready registered', (done) => {
    chai.request(server)
        .post('/registration')
        //.send(registrationTestData.invalidLastName)
        .send(registrationTestData.emailAllreadyPresent)

        .end((err, res) => {
              res.should.have.status(500);
          done();
        });
  });

/*****
 * @description-This test case will throw message that email-ID is empty.
 ****/
it('It should not POST regitstration with empty email', (done) => {
    chai.request(server)
        .post('/registration')
        .send(registrationTestData.emptyEmail)
        .end((err, res) => {
              res.should.have.status(422);
          done();
        });
  });
/*****
 * @description-This test case will throw message that email-ID is invalid.
 ****/
it('It should not POST regitstration without proper email format', (done) => {
    chai.request(server)
        .post('/registration')
        .send(registrationTestData.invalidEmail)
        .end((err, res) => {
              res.should.have.status(422);
          done();
        });
  });
/*****
 * @description-This test case will throw message that password is empty.
 ****/
it('It should not POST regitstration without password', (done) => {
    chai.request(server)
        .post('/registration')
        .send(registrationTestData.emptyPassword)
        .end((err, res) => {
              res.should.have.status(422);
          done();
        });
  });
/*****
 * @description-This test case will throw message that password length must be greater 
 *              than or equal to six.
 ****/
it('It should not POST regitstration while password length greater than or equal to 6', (done) => {
    chai.request(server)
        .post('/registration')
        .send(registrationTestData.passwordLength)
        .end((err, res) => {
              res.should.have.status(422);
          done();
        });
  });


});//describe close

















//THIS IS ANOTHER WAY TO SEND OBJECT TO TEST
/*****
 * @description-Every time new registration is required otherwise our test will fail
 ****/
// describe('/registration', () => {
//     it('it should throw msg registration done sucessfully', (done) => {
//         let registrationObject = {
//           firstName:"mifffaannnn",
//           lastName:"maffne",
//           email:"miaafffnnnn@gmail.com",
//           userType:"user",
//           password:"minffn123"
//         }
//       chai.request(server)
//           .post('/registration')
//           .send(registrationObject)
//           .end((err, res) => {
//                 res.should.have.status(200);
//             done();
//           });
//     });
// });





