const express = require("express");
const launchesRouter = require("./launches/launches.router");
const planetsRouter = require("./planets/planets.router");
const api = express.Router();

api.use("/planets", planetsRouter);
api.use("/launches", launchesRouter);

module.exports = api;
