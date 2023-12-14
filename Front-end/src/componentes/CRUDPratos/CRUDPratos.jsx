import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
import Modal from 'react-modal';
import CRUDAddPrato from '../CRUDAddPratos/CRUDAddPratos';
import { AuthContext } from '../../Context/AuthContext';

const CRUDPrato = ({ closeModal, refreshPratos }) => {
  const [pratos, setPratos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletePratoId, setDeletePratoId] = useState(null);
  const [editPratoId, setEditPratoId] = useState(null);
  const [editedTipo, setEditedTipo] = useState('');
  const [editedNome, setEditedNome] = useState('');
  const [editedAcompanhamento, setEditedAcompanhamento] = useState('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddPratoModalOpen, setAddPratoModalOpen] = useState(false);

  const authContext = useContext(AuthContext);

  const fetchPratos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/prato', {
        headers: {
          Authorization: `Bearer ${authContext.user.jwtToken.token}`,
        },
      });
  
      setPratos(response.data.message);
    } catch (error) {
      console.error('Erro ao obter os pratos:', error);
    }
  };
  
  useEffect(() => {
    fetchPratos();
  }, [deletePratoId, isDeleteModalOpen, editPratoId, isEditModalOpen]);

  const handleEditPrato = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/prato/${editPratoId}`,
        {
          nome: editedNome,
          acompanhamento: editedAcompanhamento,
          tipo: editedTipo,
        }
      );
  
      console.log('Dados do prato atualizados com sucesso!');
      setEditPratoId(null);
      setEditModalOpen(false);
      const updatedPratos = pratos.map((prato) => {
        if (prato._id === editPratoId) {
          return {
            ...prato,
            nome: editedNome,
            acompanhamento: editedAcompanhamento,
            tipo: editedTipo,
          };
        }
        return prato;
      });
      setPratos(updatedPratos);
    } catch (error) {
      console.error('Erro ao atualizar os dados do prato:', error);
    }
  };

  const handleEdit = (pratoId) => {
    setEditPratoId(pratoId);
    const pratoToEdit = pratos.find((prato) => prato._id === pratoId);
    setEditedTipo(pratoToEdit.tipo);
    setEditedNome(pratoToEdit.nome);
    setEditedAcompanhamento(pratoToEdit.acompanhamento);
    setEditModalOpen(true);
  };

  const handleDelete = (pratoId) => {
    setDeletePratoId(pratoId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/prato/${deletePratoId}`);
      setDeletePratoId(null);
      setDeleteModalOpen(false);
      console.log('Prato deletado com sucesso!');
      const updatedPratos = pratos.filter((prato) => prato._id !== deletePratoId);
      setPratos(updatedPratos);
    } catch (error) {
      console.error('Erro ao deletar prato:', error);
    }
  };

  const cancelDelete = () => {
    setDeletePratoId(null);
    setDeleteModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {/* Barra de busca */}
      <input
        type="text"
        placeholder="BUSCAR"
        className="border-2 border-gray-300 rounded-md p-2 mb-8"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tabela de pratos */}
      <div className="flex-1 border border-gray-300 rounded-md p-4 overflow-x-auto w-full">
        {pratos.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Tipo</th>
                <th className="border p-2">Nome</th>
                <th className="border p-2">Acompanhamento</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {pratos.map((prato) => (
                <tr key={prato._id}>
                  <td className="border p-2">{prato._id}</td>
                  <td className="border p-2">{prato.pratoType}</td>
                  <td className="border p-2">{prato.prato}</td>
                  <td className="border p-2">{prato.acompanhamento}</td>
                  <td className="border p-2 flex">
                    <button
                      className="mx-1 px-2 py-1 bg-blue-500 text-white rounded-md"
                      onClick={() => handleEdit(prato._id)}
                    >
                      Editar
                    </button>
                    <button
                      className="mx-1 px-2 py-1 bg-red-500 text-white rounded-md"
                      onClick={() => handleDelete(prato._id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum prato encontrado.</p>
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      {isDeleteModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <p>{`Tem certeza que deseja deletar o prato com ID: ${deletePratoId}?`}</p>
            <button
              className="mx-2 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={confirmDelete}
            >
              Sim
            </button>
            <button
              className="mx-2 px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={cancelDelete}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal de edição de prato */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={() => setEditModalOpen(false)}
          contentLabel="Editar Prato"
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
              maxWidth: '450px',
              maxHeight: '450px',
              width: '65%',  
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">Editar Prato</h2>
          </div>
        </Modal>
      )}

      {/* Modal de adição de prato */}
      {isAddPratoModalOpen && (
        <Modal
          isOpen={isAddPratoModalOpen}
          onRequestClose={() => setAddPratoModalOpen(false)}
          contentLabel="Adicionar Prato"
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
              maxWidth: '65%', 
              maxHeight: '450px',
              width: '100vh',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <CRUDAddPrato closeModal={closeModal} refreshPratos={fetchPratos} />
        </Modal>
      )}

      {/* Botão para adicionar prato */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus.outline.none focus.shadow.outline mx-auto mt-4"
        onClick={() => setAddPratoModalOpen(true)}
      >
        Adicionar Prato
      </button>
    </div>
  );
};

export default CRUDPrato;
