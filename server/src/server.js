const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const { mongoConnect } = require("./services/mongo");
const { loadLaunchesData } = require("./models/launches.model");

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

async function startServer() {
  await mongoConnect();
  await loadLaunchesData();
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
  });
}

startServer();
