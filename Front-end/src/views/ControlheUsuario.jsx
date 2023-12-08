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
  const [novoEmail, setNovoEmail] = useState('');
  const [historicoCompras, setHistoricoCompras] = useState([]);
  const [isHistoricoVisivel, setHistoricoVisivel] = useState(false);

  useEffect(() => {
    if (usuarioEncontrado) {
      setNovoNome(usuarioEncontrado.userName);
    }
  }, [usuarioEncontrado]);

  const handleBuscarUsuario = () => {
    axios.get(`http://localhost:3000/user?userName=${idUsuario}`)
      .then(response => {
        const foundUser = response.data.message[0];
        setUsuarioEncontrado({
          userId: foundUser._id,
          userName: foundUser.userName,
          userPassword: foundUser.userPassword,
          userEmail: foundUser.userEmail,
          userSubsidio: foundUser.userSubsidio,
          userCargo: foundUser.userCargo,
          userPurchases: foundUser.userPurchases,
        });
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

  const handleAlterarDados = () => {
    // Realizar o PUT na rota http://localhost:3000/user/{id} com os dados atualizados
    axios.put(`http://localhost:3000/user/${usuarioEncontrado.userId}`, {
      userName: novoNome,
      userPassword: novaSenha,
      userEmail: novoEmail,
    })
      .then(response => {
        console.log('Dados do usuário atualizados com sucesso!');
        setEdicaoAtiva(false);
        setUsuarioEncontrado({
          ...usuarioEncontrado,
          userName: novoNome,
          userEmail: novoEmail,
        });
      })
      .catch(error => {
        console.error('Erro ao atualizar os dados do usuário:', error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 max-w-md w-full text-center">
        {mostrarInputBusca && (
          <div className="mb-4">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Digite o nome do usuário"
              value={idUsuario}
              onChange={(e) => setIdUsuario(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleBuscarUsuario}
            >
              Buscar
            </button>
          </div>
        )}

        {mostrarBotoes && (
          <div className="mb-4">
            <p className="text-gray-700 text-sm font-bold mb-2">Nome do Usuário: {usuarioEncontrado?.userName}</p>
            {!isEdicaoAtiva && (
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline items-center"
                onClick={() => setEdicaoAtiva(true)}
              >
                Editar
              </button>
            )}
          </div>
        )}

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
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Novo Email"
              value={novoEmail}
              onChange={(e) => setNovoEmail(e.target.value)}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleAlterarDados}
            >
              Confirmar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
