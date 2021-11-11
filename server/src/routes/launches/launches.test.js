const app = require("../../app");
const request = require("supertest");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      await request(app)
        .get("/v1/launches")
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });

  describe("Test POST /launches", () => {
    test("It should respond with 200 success", async () => {
      const launch = {
        mission: "MarcsoX Exoploration X",
        rocket: "Explorer IS1",
        launchDate: new Date("November 7, 2045"),
        target: "Kepler-62 f",
      };
      const response = await request(app)
        .post("/v1/launches")
        .send(launch)
        .expect(201)
        .expect("Content-Type", /json/);

      // expect(response.body).toMatchObject(launch);
    });
    test("It should catch missing required properties", async () => {
      const launch = {
        mission: "MarcsoX Exoploration X",
        rocket: "Explorer IS1",
        launchDate: new Date("November 7, 2045"),
      };
      const response = await request(app)
        .post("/v1/launches")
        .send(launch)
        .expect(400)
        .expect("Content-Type", /json/);
      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });
    test("It should catch invalid format date", () => {});
  });
  afterAll(async () => {
    await mongoDisconnect();
  });
});
