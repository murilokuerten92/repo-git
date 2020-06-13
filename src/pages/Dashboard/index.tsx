import React, { useState, FormEvent, useEffect } from 'react';

import { Title, Form, Repositories, Error } from './styles';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import { FiChevronsRight } from 'react-icons/fi';

import imgLogo from '../../assets/logo.svg';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setnewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(()=> {
    const getStorage = localStorage.getItem('@githubExplorer:')
    if(getStorage){
      return JSON.parse(getStorage)
    }else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('@githubExplorer:', JSON.stringify(repositories));
  }, [repositories]);

  async function handleAddRepository(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    if (!newRepo) {
      setInputError('Digite o nome do repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`/repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setnewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro ao tentar localizar repositório');
    }
  }

  return (
    <>
      <img src={imgLogo} alt="Logo GitHub"></img>
      <Title>Explore repositórios no Github</Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          placeholder="Digite o nome aqui"
          onChange={(e) => setnewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link key={repository.full_name} to={`/repositories/${repository.full_name}`} >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronsRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
