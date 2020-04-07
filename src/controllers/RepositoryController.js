const { uuid } = require("uuidv4");
const repositories = [];

module.exports  = {

  list(request, response) {
    response.json(repositories);
  },

  create(request, response) {
  
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
  },

  update(request, response) {
  
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
  },

  delete(request, response) {
  
    const { id } = request.params;
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
    if(repositoryIndex < 0) {
      return response.status(400).json({ error: "Repository not found" });
    }
  
    repositories.splice(repositoryIndex, 1);
  
    return response.status(204).send();
  },

  createLike(request, response) {
  
    const { id } = request.params;
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
    if(repositoryIndex < 0) {
      return response.status(400).json({ error: "Repository not found" });
    }
  
    const likes = repositories[repositoryIndex].likes;
  
    repositories[repositoryIndex].likes = likes + 1;
  
    return response.json(repositories[repositoryIndex]);
  }
}