import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ControleUsuario() {
  const [nome, setNome] = useState('');
  const [historico, setHistorico] = useState([]);
  const [isHistoricoVisivel, setHistoricoVisivel] = useState(false);
  const [isEdicaoAtiva, setEdicaoAtiva] = useState(false);
  const [novoNome, setNovoNome] = useState('');

  useEffect(() => {
    axios.get("http://localhost:3000/user/:id") 
      .then(response => {
        setNome(response.data.nome);
      })
      .catch(error => {
        console.error('Erro ao obter o nome do usuário:', error);
      });

    axios.get("http://localhost:3000/user/purchases")  
      .then(response => {
        setHistorico(response.data); 
      })
      .catch(error => {
        console.error('Erro ao obter o histórico:', error);
      });
  }, []);

  const handleHistoricoToggle = () => {
    setHistoricoVisivel(prev => !prev);
  };

  const handleEdicaoToggle = () => {
    setEdicaoAtiva(prev => !prev);
  };

  const handleNomeEdicao = () => {
    axios.post("http://localhost:3000/login", { nome: novoNome })  
      .then(response => {
        console.log('Nome atualizado com sucesso!');
        // Recolhe e volta mostrar apenas o nome do usuário, o botão de editar e o botão de histórico
        setEdicaoAtiva(false);
        setHistoricoVisivel(false);
      })
      .catch(error => {
        console.error('Erro ao atualizar o nome do usuário:', error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 max-w-md w-full text-center">
        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-2">Nome do Usuário: {nome}</p>
          {!isEdicaoAtiva && (
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline items-center"
              onClick={handleEdicaoToggle}
            >
              Editar
            </button>
          )}
        </div>

        {isEdicaoAtiva && (
          <div className="flex items-center mt-2 justify-center">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 leading-tight focus:outline-none focus:shadow-outline"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleNomeEdicao}
            >
              Enviar
            </button>
          </div>
        )}

        <div className="mb-4 mt-4">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleHistoricoToggle}
          >
            {isHistoricoVisivel ? 'Recolher Histórico' : 'Mostrar Histórico'}
          </button>
        </div>

        {isHistoricoVisivel && (
          <ul className="list-disc pl-4">
            {historico.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
