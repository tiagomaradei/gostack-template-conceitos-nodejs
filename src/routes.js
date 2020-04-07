const express = require('express');
const routes = express.Router();
const { validateId } = require('./middlewares');
const RepositoryController = require('./controllers/RepositoryController');

routes.get("/repositories", RepositoryController.list);
routes.post("/repositories", RepositoryController.create);
routes.post("/repositories/:id/like", validateId, RepositoryController.createLike);
routes.put("/repositories/:id", validateId, RepositoryController.update);
routes.delete("/repositories/:id", validateId, RepositoryController.delete);

module.exports = routes;