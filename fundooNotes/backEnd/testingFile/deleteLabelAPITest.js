const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const fs=require('fs')
chai.use(chaiHttp);

let should = chai.should();

let testObject=fs.readFileSync('/home/administrator/Desktop/Bridgelab/fundooNotes/backEnd/testingFile/testingObjects.json')
let testData=JSON.parse(testObject)
 let deleteLabelTestData=testData.deleteLabelTest
console.log("DTETTETE DATA",deleteLabelTestData.deleteLabel)
 describe('Delete label', () => {
    it('It should delete label', (done) => {
       
      chai.request(server)
          .post('/updateLabel')
          .send(deleteLabelTestData.deleteLabel)
          .set(deleteLabelTestData.headerWithToken)
          .end((err, res) => {
                res.should.have.status(422);
            done();
          });
    }); 
});
