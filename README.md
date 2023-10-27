# Test Assignment Oak's Lab

## How to install app

To run the application, follow these commands in the project's root folder:

**Install project dependencies**

```
npm install
```

**Build the project**

```
npm run build
```

**Run tests**
```
npm run test
```

**Start the application**
```
npm start
```
**Run application for development**
For development purposes, run this command; there is no need to rebuild the app with every change.
```
npm run dev
```


Please follow these steps to set up and test the Node.js application.


## How to use app

This app rpovides data for multiple entities (comapanies)

Every need data are provided in on request "allData", which could be filtered by EntityID (if filtered only one entity data are returned).
Also there is returned all data according stages and steps which are returned with names and relations, swo the frontend app doesn't need any static data to assamble the requested "startup progress".

Example:
```
query AllData {
    allData(EntityID: "ca18dc1b-8a06-4592-a945-c3ee337e7fad") {
        Entities {
            ID
            CompanyName
            StreetAddress
            City
            PostalCode
            Country
            CompanyIDNumber
            TaxIdentificationNumber
            Phone
            Email
        }
        Progress {
            ID
            EntityID
            StepID
            Fulfilled
        }
        Steps {
            ID
            StageID
            Title
            PositionInStage
        }
        Stages {
            ID
            Title
            Position
        }
    }
}
```

Request "updateProgressFulfilled" could be used to change state (filfillment) of specific step given by StepID for specific EntityID.
Progress is kept in memory and there is prepared database class which could be then connected to any database layer such as MongoDB, PostgressSQL etc.

Example:
```
mutation UpdateProgressFulfilled {
    updateProgressFulfilled(
        EntityID: "ca18dc1b-8a06-4592-a945-c3ee337e7fad"
        StepID: "5c3268ae-bb3f-46ed-9801-16228a79bd53"
        Fulfilled: true
    ) {
        ID
        EntityID
        StepID
        Fulfilled
    }
}
```