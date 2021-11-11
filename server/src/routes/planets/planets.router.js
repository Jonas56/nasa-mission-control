const planetsRouter = require("express").Router();
const planetsController = require("./planets.controller");

planetsRouter.get("/", planetsController.httpgetAllPlanets);

module.exports = planetsRouter;
