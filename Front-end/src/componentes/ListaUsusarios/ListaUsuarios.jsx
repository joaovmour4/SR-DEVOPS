import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const AlunoCard = ({ userName, userEmail, _id }) => (
  <div className="border-2 border-gray-300 rounded-md p-4 m-4 shadow-md">
    <div className="mb-4">
      <p className="text-lg font-semibold">Nome: {userName}</p>
      <p className="text-sm">Email: {userEmail}</p>
    </div>
    <div className="text-sm text-gray-600">
      <p>ID: {_id}</p>
    </div>
  </div>
);

const ListaUsuarios = () => {
  const [alunos, setAlunos] = useState([]);
  const { user } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user', {
          headers: {
            Authorization: `Bearer ${user.jwtToken.token}`,
          }
        });
        // Filtrar usuários excluindo o usuário adm
        const usuariosExcluindoAdmin = response.data.message.filter(user => user.userName !== 'admin');
        setAlunos(usuariosExcluindoAdmin);
      } catch (error) {
        console.error('Erro ao obter dados dos alunos:', error);
      }
    };
    fetchData();
  }, []);

  // Filtrar usuários ou buscar um específico
  const filteredAlunos = alunos.filter(aluno =>
    aluno.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Buscador */}
      {alunos && (
        <>
          <div className="text-center my-4">
          <input
            type="text"
            placeholder="Pesquisar Usuário"
            className="border-2 border-gray-300 rounded-md p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </div>
            {/* Lista de usuários */}
            <div className="flex justify-between flex-wrap h-screen">
              {filteredAlunos.map((aluno) => (
                <AlunoCard key={aluno._id} {...aluno} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListaUsuarios;
