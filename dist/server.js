"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const uuid_1 = require("uuid");
const database_1 = require("./database");
const app = (0, express_1.default)();
const database = new database_1.Database(); // created database instance
const EntityType = new graphql_1.GraphQLObjectType({
    name: 'Entity',
    fields: () => ({
        ID: { type: graphql_1.GraphQLString },
        CompanyName: { type: graphql_1.GraphQLString },
        StreetAddress: { type: graphql_1.GraphQLString },
        City: { type: graphql_1.GraphQLString },
        PostalCode: { type: graphql_1.GraphQLString },
        Country: { type: graphql_1.GraphQLString },
        CompanyIDNumber: { type: graphql_1.GraphQLString },
        TaxIdentificationNumber: { type: graphql_1.GraphQLString },
        Phone: { type: graphql_1.GraphQLString },
        Email: { type: graphql_1.GraphQLString },
    }),
});
const ProgressType = new graphql_1.GraphQLObjectType({
    name: 'Progress',
    fields: () => ({
        ID: { type: graphql_1.GraphQLString },
        EntityID: { type: graphql_1.GraphQLString },
        StepID: { type: graphql_1.GraphQLString },
        Fulfilled: { type: graphql_1.GraphQLBoolean },
    }),
});
const StageType = new graphql_1.GraphQLObjectType({
    name: 'Stage',
    fields: () => ({
        ID: { type: graphql_1.GraphQLString },
        Title: { type: graphql_1.GraphQLString },
        Position: { type: graphql_1.GraphQLString },
    }),
});
const StepType = new graphql_1.GraphQLObjectType({
    name: 'Step',
    fields: () => ({
        ID: { type: graphql_1.GraphQLString },
        StageID: { type: graphql_1.GraphQLString },
        Title: { type: graphql_1.GraphQLString },
        PositionInStage: { type: graphql_1.GraphQLString },
    }),
});
const allDataType = new graphql_1.GraphQLObjectType({
    name: 'AllData',
    fields: () => ({
        Entities: { type: new graphql_1.GraphQLList(EntityType) },
        Progress: { type: new graphql_1.GraphQLList(ProgressType) },
        Stages: { type: new graphql_1.GraphQLList(StageType) },
        Steps: { type: new graphql_1.GraphQLList(StepType) },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        allData: {
            type: allDataType,
            args: {
                EntityID: { type: graphql_1.GraphQLString },
            },
            resolve: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                // Filter "Entities" a "Progress" by EntityID, if assigned
                let result = yield database.getAllData(); // Created copy of all data
                if (args.EntityID) {
                    // Filter "Entities"
                    result.Entities = result.Entities.filter((entity) => entity.ID === args.EntityID);
                    // Filter "Progress"
                    result.Progress = result.Progress.filter((progress) => progress.EntityID === args.EntityID);
                }
                return result;
            }),
        },
    },
});
const RootMutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        updateProgressFulfilled: {
            type: ProgressType,
            args: {
                EntityID: { type: graphql_1.GraphQLString },
                StepID: { type: graphql_1.GraphQLString },
                Fulfilled: { type: graphql_1.GraphQLBoolean },
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const { EntityID, StepID, Fulfilled } = args;
                const existingRecord = yield findProgressByEntityAndStep(EntityID, StepID);
                if (existingRecord) {
                    // console.log(existingRecord)
                    let updatedRecord = yield database.updateProgressData(existingRecord.ID, Fulfilled);
                    console.log("Record " + existingRecord.ID + " updated");
                    return updatedRecord;
                }
                else {
                    const newID = (0, uuid_1.v4)();
                    const newRecord = {
                        ID: newID,
                        EntityID,
                        StepID,
                        Fulfilled,
                    };
                    // TODO check if the StepID exists in Steps
                    // TODO check if the EntityID exists in Entities
                    // TODO return 404 error if not
                    yield database.insertProgressData(newRecord);
                    console.log("Record " + newRecord.ID + " added");
                    return newRecord;
                }
            }),
        },
    },
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
// GraphQL schema applied on API enpoint
app.use('/api', (0, express_graphql_1.graphqlHTTP)({
    schema,
    graphiql: true,
}));
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server runs on port ${port}`);
});
function findProgressByEntityAndStep(EntityID, StepID) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield database.getAllData();
        return data.Progress.find(item => item.EntityID === EntityID && item.StepID === StepID);
    });
}
exports.default = app;
