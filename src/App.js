import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    loadRepository();
  }, []);

  async function loadRepository() {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
      console.log(response);
    });
  }

  async function handleAddRepository() {
    // TODO
    const response = await api.post("repositories", {
      title: `Novo Projeto ${Date.now()}`,
      url: "http://localhost:3000",
      techs: ["ReactJS", "NodeJS"],
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    console.log(id);
    console.log(repositories);
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
