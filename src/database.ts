
// This is prepared general class for database connector acepting and stroing any data od any types


export interface ProgressType {
  ID: string;
  EntityID: string;
  StepID: string;
  Fulfilled: boolean;
}

export interface EntitiesType {
  ID: string;
  CompanyName: string;
  StreetAddress: string;
  City: string;
  PostalCode: string;
  Country: string;
  CompanyIDNumber: string;
  TaxIdentificationNumber: string;
  Phone: string;
  Email:  string;
}

export interface StagesType {
  ID: string;
  Title: string;
  Position: number;
}

export interface StepsType {
  ID: string;
  StageID: string;
  Title: string;
  PositionInStage: number;
}

export interface DataType {
  Progress: ProgressType[];
  Entities: EntitiesType[];
  Stages: StagesType[];
  Steps: StepsType[];
}



export class Database {



  private data: DataType = {
    "Progress": [
      {
        "ID": "cff98124-0f88-48c0-816e-11777cf84a37",
        "EntityID": "ca18dc1b-8a06-4592-a945-c3ee337e7fad",
        "StepID": "81a3d864-0221-4ab3-99bf-0388c20600f8",
        "Fulfilled": true,
      },
      {
        "ID": "cff98124-0f88-48c0-816e-11777cf84a37",
        "EntityID": "ca18dc1b-8a06-4592-a945-c3ee337e7fad",
        "StepID": "3b63b445-7b3b-41b2-ba5b-6ed821eab55a",
        "Fulfilled": true,
      },
      {
        "ID": "cff98124-0f88-48c0-816e-11777cf84a37",
        "EntityID": "ca18dc1b-8a06-4592-a945-c3ee337e7fad",
        "StepID": "03f215a5-1b03-4b70-80d0-0081935c6171",
        "Fulfilled": true,
      },
      {
        "ID": "cff98124-0f88-48c0-816e-11777cf84a37",
        "EntityID": "ca18dc1b-8a06-4592-a945-c3ee337e7fad",
        "StepID": "b1db438b-794a-4ef7-a7ee-a1b952660bbe",
        "Fulfilled": true,
      },
      {
        "ID": "cff98124-0f88-48c0-816e-11777cf84a37",
        "EntityID": "ca18dc1b-8a06-4592-a945-c3ee337e7fad",
        "StepID": "c19a7816-9573-4600-ad7f-761ae037fd57",
        "Fulfilled": true,
      },
    ],
    "Entities": [
      {
        "ID": "ca18dc1b-8a06-4592-a945-c3ee337e7fad",
        "CompanyName": "StartUpEntity", 
        "StreetAddress": "987 Startspring",
        "City": "Springfield",
        "PostalCode": "12345",
        "Country": "Stan",
        "CompanyIDNumber": "ST-464877764541",
        "TaxIdentificationNumber": "76876848346",
        "Phone": "+1 123 456 789",
        "Email": "info@startupentity.org",
      },
    ],
    "Stages": [
      {
        "ID": "3568fbe7-b19e-4c61-9072-5429996c5c8a",
        "Title": "Foundation",
        "Position": 1,
      },
      {
        "ID": "1d6ee1a5-cb7f-4c4a-89eb-7de69f917ccc",
        "Title": "Discovery",
        "Position": 2,
      },
      {
        "ID": "cff98124-0f88-48c0-816e-11777cf84a37",
        "Title": "Delivery",
        "Position": 3,
      },
    ],
    "Steps": [
      {
        "ID": "117f3002-3da8-4d8f-bcba-193e91ddd52f",
        "StageID": "3568fbe7-b19e-4c61-9072-5429996c5c8a",
        "Title": "Setup virtual office",
        "PositionInStage": 1,
      },
      {
        "ID": "3b63b445-7b3b-41b2-ba5b-6ed821eab55a",
        "StageID": "3568fbe7-b19e-4c61-9072-5429996c5c8a",
        "Title": "Set mission & vision",
        "PositionInStage": 2,
      },
      {
        "ID": "03f215a5-1b03-4b70-80d0-0081935c6171",
        "StageID": "3568fbe7-b19e-4c61-9072-5429996c5c8a",
        "Title": "Select business name",
        "PositionInStage": 3,
      },
      {
        "ID": "b1db438b-794a-4ef7-a7ee-a1b952660bbe",
        "StageID": "3568fbe7-b19e-4c61-9072-5429996c5c8a",
        "Title": "Buy domains",
        "PositionInStage": 4,
      },
      {
        "ID": "c19a7816-9573-4600-ad7f-761ae037fd57",
        "StageID": "1d6ee1a5-cb7f-4c4a-89eb-7de69f917ccc",
        "Title": "Create roadmap",
        "PositionInStage": 1,
      },
      {
        "ID": "81a3d864-0221-4ab3-99bf-0388c20600f8",
        "StageID": "1d6ee1a5-cb7f-4c4a-89eb-7de69f917ccc",
        "Title": "Competitor analysis",
        "PositionInStage": 2,
      },
      {
        "ID": "5c3268ae-bb3f-46ed-9801-16228a79bd53",
        "StageID": "cff98124-0f88-48c0-816e-11777cf84a37",
        "Title": "Release marketing website",
        "PositionInStage": 1,
      },
      {
        "ID": "020d58bd-0a41-4198-ab02-c02e6c3ef952",
        "StageID": "cff98124-0f88-48c0-816e-11777cf84a37",
        "Title": "Release MVP",
        "PositionInStage": 2,
      },
    ],
  };



  async insertProgressData(data: ProgressType): Promise<ProgressType> {
    this.data.Progress.push(data);
    return data;
  }

  async updateProgressData(ID: string, FulFilled: boolean): Promise<ProgressType> {
    let objIndex = this.data.Progress.findIndex((obj => obj.ID == ID));
    
    this.data.Progress[objIndex].Fulfilled = FulFilled;
    return this.data.Progress[objIndex];
  }

  async getAllData(): Promise<DataType> {
    return this.data;
  }

}