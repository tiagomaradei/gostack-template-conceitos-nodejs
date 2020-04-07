const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
const { validateId } = require('./Middlewares');
const app = express();
const repositories = [];

app.use(express.json());
app.use(cors());

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", validateId, (request, response) => {
  
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", validateId, (request, response) => {
  
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", validateId, (request, response) => {
  
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  const likes = repositories[repositoryIndex].likes;

  repositories[repositoryIndex].likes = likes + 1;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;