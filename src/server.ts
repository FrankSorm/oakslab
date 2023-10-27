import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInputObjectType, GraphQLBoolean, GraphQLList } from 'graphql';
import { v4 as uuidv4 } from 'uuid';
import { Database } from './database';

const app = express();

const database = new Database(); // created database instance

const EntityType = new GraphQLObjectType({
  name: 'Entity',
  fields: () => ({
    ID: { type: GraphQLString },
    CompanyName: { type: GraphQLString },
    StreetAddress: { type: GraphQLString },
    City: { type: GraphQLString },
    PostalCode: { type: GraphQLString },
    Country: { type: GraphQLString },
    CompanyIDNumber: { type: GraphQLString },
    TaxIdentificationNumber: { type: GraphQLString },
    Phone: { type: GraphQLString },
    Email: { type: GraphQLString },  }),
});

const ProgressType = new GraphQLObjectType({
  name: 'Progress',
  fields: () => ({
    ID: { type: GraphQLString },
    EntityID: { type: GraphQLString },
    StepID: { type: GraphQLString },
    Fulfilled: { type: GraphQLBoolean },
  }),
});

const StageType = new GraphQLObjectType({
  name: 'Stage',
  fields: () => ({
    ID: { type: GraphQLString },
    Title: { type: GraphQLString },
    Position: { type: GraphQLString },
  }),
});

const StepType = new GraphQLObjectType({
  name: 'Step',
  fields: () => ({
    ID: { type: GraphQLString },
    StageID: { type: GraphQLString },
    Title: { type: GraphQLString },
    PositionInStage: { type: GraphQLString },
  }),
});

const allDataType = new GraphQLObjectType({
  name: 'AllData',
  fields: () => ({
    Entities: { type: new GraphQLList(EntityType) },
    Progress: { type: new GraphQLList(ProgressType) },
    Stages: { type: new GraphQLList(StageType) },
    Steps: { type: new GraphQLList(StepType) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    allData: {
      type: allDataType,
      args: {
        EntityID: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        // Filter "Entities" a "Progress" by EntityID, if assigned
        let result = await database.getAllData(); // Created copy of all data
        if (args.EntityID) {
          // Filter "Entities"
          result.Entities = result.Entities.filter((entity) => entity.ID === args.EntityID);
          // Filter "Progress"
          result.Progress = result.Progress.filter((progress) => progress.EntityID === args.EntityID);
        }
        return result;
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateProgressFulfilled: {
      type: ProgressType,
      args: {
        EntityID: { type: GraphQLString },
        StepID: { type: GraphQLString },
        Fulfilled: { type: GraphQLBoolean },
      },
      resolve: async (parent, args) => {
        const { EntityID, StepID, Fulfilled } = args;
        const existingRecord = await findProgressByEntityAndStep(EntityID, StepID);
        if (existingRecord) {
          // console.log(existingRecord)
          let updatedRecord = await database.updateProgressData(existingRecord.ID, Fulfilled);
          console.log("Record "+existingRecord.ID+" updated")
          return updatedRecord;
        } else {
          const newID = uuidv4();
          const newRecord = {
            ID: newID,
            EntityID,
            StepID,
            Fulfilled,
          };
          // TODO check if the StepID exists in Steps
          // TODO check if the EntityID exists in Entities
          // TODO return 404 error if not
          await database.insertProgressData(newRecord);
          console.log("Record "+newRecord.ID+" added")
          return newRecord;
        }
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

// GraphQL schema applied on API enpoint
app.use(
  '/api',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});

async function findProgressByEntityAndStep(EntityID: string, StepID: string) {
  let data = await database.getAllData()
  return  data.Progress.find(item => item.EntityID === EntityID && item.StepID === StepID);
}

export default app;