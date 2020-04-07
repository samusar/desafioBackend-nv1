const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// Rota de Listagem de Repositórios
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

// Rota de Criação de Repositorio
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);
  
  return response.json(repository);
});

// Rota de Atualização de Repositório
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(item => item.id === id);

  if(repositoryIndex < 0) return response.status(400).json({ error: "Repository not found." });

  const { title, url, techs } = request.body;

  
  repositories[repositoryIndex] = { ...repositories[repositoryIndex], title, url, techs };
  const repository = repositories[repositoryIndex];

  return response.json(repository);
});

// Rota de Deleção de Repositório
app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(item => item.id === id);

  if(repositoryIndex < 0) return res.status(400).json({ error: "Repository not found." });

  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();
});

// Rota de Incremento de Likes no repositório
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(item => item.id === id);

  if(repositoryIndex < 0) return response.status(400).json({ error: "Repository not found." });

  const repository = repositories[repositoryIndex];
  repository.likes = repository.likes + 1;
  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

module.exports = app;
