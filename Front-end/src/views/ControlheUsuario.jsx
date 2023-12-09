import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

export default function ControleUsuario() {
  const { user } = useContext(AuthContext);
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

  // useEffect(() => {
  //   if (usuarioEncontrado) {
  //     setNovoNome(usuarioEncontrado.userName);
  //   }
  // }, [usuarioEncontrado]);

  console.log(user)

  const handleBuscarUsuario = () => {
    // Suponha que você tenha o token armazenado em algum lugar, como em uma variável chamada authToken
    const authToken = user.jwtToken.token
  
    axios.get(`http://localhost:3000/user`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then(response => {
      console.log(response.data.message)
      setUsuarioEncontrado(response.data.message.find(user => user.userName === idUsuario));
      setMostrarInputBusca(false);
      setMostrarBotoes(true);
    })
    .catch(error => {
      console.error(error);
      // Trate o erro aqui, se necessário
    });
  };

  // const handleAlterarDados = () => {
  //   axios.put(`http://localhost:3000/user/${usuarioEncontrado.userId}`, {
  //     userName: novoNome,
  //     userPassword: novaSenha,
  //     userEmail: novoEmail,
  //   })
  //     .then(response => {
  //       console.log('Dados do usuário atualizados com sucesso!');
  //       setEdicaoAtiva(false);
  //       setUsuarioEncontrado({
  //         ...usuarioEncontrado,
  //         userName: novoNome,
  //         userEmail: novoEmail,
  //       });
  //     })
  //     .catch(error => {
  //       console.error('Erro ao atualizar os dados do usuário:', error);
  //     });
  // };

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
            <p className="text-gray-700 text-sm font-bold mb-2">Id usuário: {usuarioEncontrado?._id}</p>
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
          <div className="flex items-center mt-2 justify-center flex-col mb-4">
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
              // onClick={handleAlterarDados}
            >
              Confirmar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}