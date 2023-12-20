import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const ControleUsuario = () => {
  const { user } = useContext(AuthContext);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);
  const [mostrarInputBusca, setMostrarInputBusca] = useState(true);
  const [mostrarBotoes, setMostrarBotoes] = useState(false);
  const [isEdicaoAtiva, setEdicaoAtiva] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [novoEmail, setNovoEmail] = useState('');

  useEffect(() => {
    console.log(usuarioEncontrado);
  }, [usuarioEncontrado]);

  console.log(user);

  const handleBuscarUsuario = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      const foundUser = response.data.message.find((user) => user.userName === nomeUsuario);

      if (foundUser) {
        setUsuarioEncontrado(foundUser);
        setMostrarInputBusca(false);
        setMostrarBotoes(true);
      } else {
        console.log('Usuário não encontrado.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAlterarDados = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/user/${usuarioEncontrado._id}`,
        {
          userName: novoNome,
          userPassword: novaSenha,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );

      console.log('Dados do usuário atualizados com sucesso!');
      setEdicaoAtiva(false);
      setUsuarioEncontrado({
        ...usuarioEncontrado,
        userName: novoNome,
      });
    } catch (error) {
      console.error('Erro ao atualizar os dados do usuário:', error);
    }
  };

  const handleExcluirUsuario = async () => {
    if (!usuarioEncontrado) {
      console.error('Nenhum usuário encontrado para excluir.');
      return;
    }

    const confirmacao = window.confirm('Tem certeza que deseja excluir este usuário?');

    if (confirmacao) {
      try {
        await axios.delete(`http://localhost:3000/user/${usuarioEncontrado._id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });

        console.log('Usuário excluído com sucesso!');
        setUsuarioEncontrado(null);
        setMostrarBotoes(false);
        setMostrarInputBusca(true);
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  };
  
  const handleCancelarAlteracoes = () => {
    setEdicaoAtiva(false);
    setNovoNome('');
    setNovaSenha('');
    setNovoEmail('');
  };

  const handleVoltarParaBuscar = () => {
    setMostrarInputBusca(true);
    setMostrarBotoes(false);
    setUsuarioEncontrado(null);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 max-w-md w-full text-center">
        {mostrarInputBusca && (
          <div className="mb-4">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 leading-tight focus:outline-none focus:shadow-outline mb-8"
              placeholder="Digite o nome do usuário"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleBuscarUsuario}
            >
              BUSCAR
            </button>
            
          </div>
        )}

        {mostrarBotoes && (
          <div className="mb-4">
            <p className="text-gray-700 text-sm font-bold mb-2">Nome do Usuário: {usuarioEncontrado?.userName}</p>
            <p className="text-gray-700 text-sm font-bold mb-2">Id usuário: {usuarioEncontrado?._id}</p>
            <p className="text-gray-700 text-sm font-bold mb-2">Email do Usuário: {usuarioEncontrado?.userEmail}</p>
            {!isEdicaoAtiva && (
              <>
                <button
                  className="bg-green-700 hover:bg-green-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline items-center"
                  onClick={() => setEdicaoAtiva(true)}
                >
                  EDITAR
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline items-center ml-2"
                  onClick={handleExcluirUsuario}
                >
                  EXCLUIR
                </button>
              </>
            )}
          </div>
        )}

        {isEdicaoAtiva && (
          <div className="flex items-center mt-2 justify-center flex-col mb-4">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 leading-tight focus:outline-none focus:shadow-outline mb-4"
              placeholder="Novo Nome"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
            />
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 leading-tight focus:outline-none focus:shadow-outline mb-4"
              placeholder="Nova Senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 leading-tight focus:outline-none focus:shadow-outline mb-4"
              placeholder="Novo E-mail"
              value={novoEmail}
              onChange={(e) => setNovoEmail(e.target.value)}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleAlterarDados}
            >
              CONFIRMAR
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus.outline.none focus.shadow.outline mt-2"
              onClick={handleCancelarAlteracoes}
            >
              VOLTAR
            </button>
          </div>
        )}

        {mostrarBotoes && (
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus.outline.none focus.shadow.outline mt-2"
            onClick={handleVoltarParaBuscar}
          >
            VOLTAR
          </button>
        )}
      </div>
    </div>
  );
};

export default ControleUsuario;
