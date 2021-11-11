const planets = require("./planets.mongo");

const parse = require("csv-parse");
const fs = require("fs");

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream("./src/data/Kepler_data.csv")
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanets(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countHabitablePlanets = (await getAllHabitablePlanets()).length;
        console.log(countHabitablePlanets, "habitable planets found!");
        resolve();
      });
  });
}

async function getAllHabitablePlanets() {
  return await planets.find({}, { _id: 0, __v: 0 });
}

async function savePlanets(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      { upsert: true }
    );
  } catch (err) {
    console.log(`Unable to save planet ${err}`);
  }
}

module.exports = {
  getAllHabitablePlanets,
  loadPlanetsData,
};
