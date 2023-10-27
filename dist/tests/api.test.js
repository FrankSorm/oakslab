"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const mocha_1 = require("mocha");
const server_1 = __importDefault(require("../server")); // Použijte relativní cestu k serverovému souboru
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
(0, mocha_1.describe)('GraphQL API', () => {
    (0, mocha_1.it)('should update progress with provided data', (done) => {
        const inputData = {
            EntityID: "ca18dc1b-8a06-4592-a945-c3ee337e7fad",
            StepID: "5c3268ae-bb3f-46ed-9801-16228a79bd53",
            Fulfilled: true,
        };
        chai_1.default
            .request(server_1.default)
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
    (0, mocha_1.it)('should return all data', (done) => {
        const inputData = {
            EntityID: "ca18dc1b-8a06-4592-a945-c3ee337e7fad",
        };
        chai_1.default
            .request(server_1.default)
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
