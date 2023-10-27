import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../server'; // Použijte relativní cestu k serverovému souboru

chai.use(chaiHttp);

const expect = chai.expect;

describe('GraphQL API', () => {
  it('should update progress with provided data', (done) => {
    const inputData = {
      EntityID: "ca18dc1b-8a06-4592-a945-c3ee337e7fad",
      StepID: "5c3268ae-bb3f-46ed-9801-16228a79bd53",
      Fulfilled: true,
    };

    chai
      .request(app)
      .post('/api')
      .send({
        query: `
          mutation {
            updateProgressFulfilled(
              EntityID: "${inputData.EntityID}"
              StepID: "${inputData.StepID}"
              Fulfilled: ${inputData.Fulfilled}
            ) {
              ID
              EntityID
              StepID
              Fulfilled
            }
          }
        `,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('updateProgressFulfilled');
        expect(res.body.data.updateProgressFulfilled).to.be.a('object');
        expect(res.body.data.updateProgressFulfilled).to.have.property('ID');
        expect(res.body.data.updateProgressFulfilled.ID).to.be.a('string');
        expect(res.body.data.updateProgressFulfilled).to.have.property('EntityID');
        expect(res.body.data.updateProgressFulfilled.EntityID).to.be.a('string');
        expect(res.body.data.updateProgressFulfilled.EntityID).to.equal(inputData.EntityID);
        expect(res.body.data.updateProgressFulfilled).to.have.property('StepID');
        expect(res.body.data.updateProgressFulfilled.StepID).to.be.a('string');
        expect(res.body.data.updateProgressFulfilled.StepID).to.equal(inputData.StepID);
        expect(res.body.data.updateProgressFulfilled).to.have.property('Fulfilled');
        expect(res.body.data.updateProgressFulfilled.Fulfilled).to.be.a('boolean');
        expect(res.body.data.updateProgressFulfilled.Fulfilled).to.equal(inputData.Fulfilled);
        done();
      });
  });

  it('should return all data', (done) => {
    const inputData = {
      EntityID: "ca18dc1b-8a06-4592-a945-c3ee337e7fad",
    };

    chai
      .request(app)
      .post('/api')
      .send({
        query: `
          {
            allData(EntityID: "${inputData.EntityID}") {
              Entities {
                ID
              }
              Progress {
                ID
              }
              Stages {
                ID
              }
              Steps {
                ID
              }
            }
          }
        `,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('allData');
        expect(res.body.data.allData).to.be.a('object');
        expect(res.body.data.allData).to.have.property('Entities');
        expect(res.body.data.allData.Entities).to.be.a('array');
        expect(res.body.data.allData.Entities.length).to.be.equal(1);
        expect(res.body.data.allData.Entities[0]).to.have.property('ID');
        expect(res.body.data.allData.Entities[0].ID).to.be.equal(inputData.EntityID);
        expect(res.body.data.allData).to.have.property('Steps');
        expect(res.body.data.allData.Steps).to.be.a('array');
        expect(res.body.data.allData.Steps.length).to.be.equal(8);
        expect(res.body.data.allData).to.have.property('Stages');
        expect(res.body.data.allData.Stages).to.be.a('array');
        expect(res.body.data.allData.Stages.length).to.be.equal(3);
        expect(res.body.data.allData).to.have.property('Progress');
        expect(res.body.data.allData.Progress).to.be.a('array');
        // TODO added checks for all propertieas in arrays...
        done();
      });
  });

});