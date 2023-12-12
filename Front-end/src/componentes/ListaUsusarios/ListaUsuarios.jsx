import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { AuthContext } from '../../Context/AuthContext';

const AlunoCard = ({ userName, userEmail, _id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [purchaseData, setPurchaseData] = useState(null);
  const { user } = useContext(AuthContext);

  const handleOpenModal = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/purchase`, {
        headers: {
          Authorization: `Bearer ${user.jwtToken.token}`,
        },
        params: {
          userId: _id, // Passa o ID do usuário associado ao botão
        },
      });

      if (response.data.message) {
        const purchases = response.data.message;
        if (purchases.length > 0) {
          setPurchaseData(purchases[0]);
          setModalIsOpen(true);
        } else {
          console.warn('O usuário não possui compras.');
        }
      } else {
        console.error('Resposta da compra não contém a propriedade "message".', response.data);
      }
    } catch (error) {
      console.error('Erro ao obter dados da compra:', error);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col md:w-1/2 p-4">
        <div className="border-2 border-gray-300 rounded-md p-4 m-4 shadow-md relative">
          <div className="mb-4 flex justify-between items-center">
            <div style={{ minWidth: '250px', maxWidth: '400px' }}>
              <p className="text-lg font-semibold">Nome: {userName}</p>
              <p className="text-sm">Email: {userEmail}</p>
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleOpenModal(_id)}
            >
              NF
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <p>ID: {_id}</p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Dados da Compra"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          content: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '350px',
            width: '100%',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        {purchaseData && (
          <div className="p-4">
            <div className="flex justify-end">
              <button
                className="text-xl font-bold text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={handleCloseModal}
              >
                X
              </button>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-2">Nota Fiscal</h2>
              <p className="mb-2">ID: {purchaseData._id}</p>
              <p className="mb-2">Usuário ID: {purchaseData.userId}</p>
              <p className="mb-2">Quantidade: {purchaseData.quantity}</p>
              <p className="mb-2">Valor: {purchaseData.value}</p>
              <p className="mb-2">Data da Compra: {purchaseData.purchaseDate}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

const ListaUsuarios = () => {
  const [alunos, setAlunos] = useState([]);
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user', {
          headers: {
            Authorization: `Bearer ${user.jwtToken.token}`,
          },
        });
        const usuariosExcluindoAdmin = response.data.message.filter(
          (user) => user.userName !== 'admin'
        );
        setAlunos(usuariosExcluindoAdmin);
      } catch (error) {
        console.error('Erro ao obter dados dos alunos:', error);
      }
    };
    fetchData();
  }, [user]);

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
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
          <div className="flex flex-wrap justify-center">
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
