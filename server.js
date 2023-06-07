const express = require ("express");
const usersRouter = require("./routes/user");
const recipesRouter = require("./routes/recipes");
const healthRouter = require("./routes/health");
const logger = require("./middleware/logger");

const server = express();
server.use(express.json());
server.use(usersRouter);
server.use(recipesRouter);



server.use(healthRouter.router);

server.use(logger);



module.exports = server;
