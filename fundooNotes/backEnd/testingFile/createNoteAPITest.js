const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const fs=require('fs')
chai.use(chaiHttp);

let should = chai.should();

let testObject=fs.readFileSync('/home/administrator/Desktop/Bridgelab/fundooNotes/backEnd/testingFile/testingObjects.json')
let testData=JSON.parse(testObject)
 let createNoteTestData=testData.createNoteTest
console.log("DTETTETE DATA",createNoteTestData.emptyNote)


 describe('Note', () => {
    it('It should should post because of valid field', (done) => {
       
      chai.request(server)
          .post('/createNote')
          .send(createNoteTestData.validNote)
          .set(createNoteTestData.headerWithToken)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    }); 
});