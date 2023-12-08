import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ControleUsuario() {
  const [idUsuario, setIdUsuario] = useState('');
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);
  const [mostrarInputBusca, setMostrarInputBusca] = useState(true);
  const [mostrarBotoes, setMostrarBotoes] = useState(false);
  const [isEdicaoAtiva, setEdicaoAtiva] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [historicoCompras, setHistoricoCompras] = useState([]);
  const [isHistoricoVisivel, setHistoricoVisivel] = useState(false);

  useEffect(() => {
    if (usuarioEncontrado) {
      setNovoNome(usuarioEncontrado.userName);
    }
  }, [usuarioEncontrado]);

  const handleBuscarUsuario = () => {
    axios.get(`http://localhost:3000/user/id/${idUsuario}`)
      .then(response => {
        setUsuarioEncontrado(response.data);
        setMostrarInputBusca(false);
        setMostrarBotoes(true);
      })
      .catch(error => {
        console.error('Erro ao buscar o usuário:', error);
        setUsuarioEncontrado(null);
        setMostrarBotoes(false);
        setMostrarInputBusca(true);
        setEdicaoAtiva(false);
        setHistoricoVisivel(false);
      });
  };

  const handleEditarUsuario = () => {
    setEdicaoAtiva(true);
  };

  const handleConfirmarEdicao = () => {
    axios.put(`http://localhost:3000/user/id/${idUsuario}`, {
      userName: novoNome,
      userPassword: novaSenha,
    })
      .then(response => {
        console.log('Usuário atualizado com sucesso:', response.data);
        setUsuarioEncontrado(response.data);
        setEdicaoAtiva(false);
      })
      .catch(error => {
        console.error('Erro ao atualizar o usuário:', error);
      });
  };

  const handleHistoricoToggle = () => {
    setHistoricoVisivel(prev => !prev);

    if (!isHistoricoVisivel && usuarioEncontrado) {
      axios.get(`http://localhost:3000/user/id/${idUsuario}/purchases`)
        .then(response => {
          setHistoricoCompras(response.data);
        })
        .catch(error => {
          console.error('Erro ao obter o histórico de compras:', error);
        });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 max-w-md w-full text-center">
        {mostrarInputBusca && (
          <div>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ID do Usuário"
              value={idUsuario}
              onChange={(e) => setIdUsuario(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleBuscarUsuario}
            >
              Buscar Usuário
            </button>
          </div>
        )}

        {mostrarBotoes && (
          <>
            <div className="mb-4">
              <p className="text-gray-700 text-sm font-bold mb-2">Nome do Usuário: {usuarioEncontrado?.userName}</p>
              {!isEdicaoAtiva && (
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline items-center"
                  onClick={handleEditarUsuario}
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
                  placeholder="Novo Nome"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                />
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Nova Senha"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleConfirmarEdicao}
                >
                  Confirmar
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
                {historicoCompras.map((compra, index) => (
                  <li key={index}>{compra}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
