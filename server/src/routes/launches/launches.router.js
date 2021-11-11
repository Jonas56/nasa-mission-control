const launchesRouter = require("express").Router();
const launchesController = require("./launches.controller");

launchesRouter.get("/", launchesController.httpGetAllLaunches);
launchesRouter.post("/", launchesController.httpAddNewLaunch);
launchesRouter.delete("/:id", launchesController.httpAbortLaunch);

module.exports = launchesRouter;
