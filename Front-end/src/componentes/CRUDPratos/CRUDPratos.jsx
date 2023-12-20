import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CRUDAddPratos from '../CRUDAddPratos/CRUDAddPratos';
import { AuthContext } from '../../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';


Modal.setAppElement('#root');

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

  const [newPrato, setNewPrato] = useState({ nomePrato: '', tipoPrato: null });

  const handleAddPrato = async () => {
    try {
      if (!newPrato.tipoPrato) {
        console.error('Selecione um tipo de prato antes de adicionar.');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/prato',
        {
          prato: newPrato.nomePrato,
          pratoType: newPrato.tipoPrato,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );

      console.log('Prato adicionado com sucesso!');
      closeModal();
      setEditPratoId(null);
      refreshPratos();
    } catch (error) {
      console.error('Erro ao  o prato:', error);
    }
  };

  const fetchPratos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/prato', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      setPratos(response.data.message);
    } catch (error) {
      console.error('Erro ao obter os pratos:', error);
    }
  };

  useEffect(() => {
    fetchPratos();
  }, [editPratoId]);

  const handleEditPrato = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/prato/${editPratoId}`,
        {
          prato: editedNome,
          pratoType: editedTipo,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );

      console.log('Dados do prato atualizados com sucesso!');
      setEditPratoId(null);
      setEditModalOpen(false);

      setPratos(prevPratos => {
        return prevPratos.map(prato => {
          if (prato._id === editPratoId) {
            return {
              ...prato,
              prato: editedNome,
              pratoType: editedTipo,
            };
          }
          return prato;
        });
      });
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
      const currentDeletePratoId = deletePratoId;
      await axios.delete(`http://localhost:3000/prato/${currentDeletePratoId}`);

      setDeletePratoId(null);
      setDeleteModalOpen(false);
      console.log(`Prato com ID ${currentDeletePratoId} deletado com sucesso!`);

      const updatedPratos = pratos.filter((prato) => prato._id !== currentDeletePratoId);
      setPratos(updatedPratos);
    } catch (error) {
      console.error('Erro ao deletar prato:', error);
    }
  };

  const cancelDelete = () => {
    setDeletePratoId(null);
    setDeleteModalOpen(false);
  };


  const filteredPratos = pratos.filter(prato => {
    return prato.prato.toLowerCase().includes(searchTerm.toLowerCase());
  });

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

      {/* Botão para adicionar prato */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus.outline.none focus.shadow.outline mx-auto mt-4 mb-4"
        onClick={() => setAddPratoModalOpen(true)}
      >
        <FontAwesomeIcon icon={faUtensils} className="mr-2" />
        <span className='ml-2 hidden md:inline'>ADICIONAR PRATO</span>
      </button>


      {/* Tabela de pratos */}
      <div className="flex-1 border border-gray-300 rounded-md p-4 overflow-x-auto max-w-screen-sm mx-auto md:max-w-none">
        {filteredPratos.length > 0 ? (
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr>
                <th className="border p-2 hidden md:table-cell">ID</th>
                <th className="border p-2 hidden md:table-cell">TIPO</th>
                <th className="border p-2">NOME</th>
                <th className="border p-2">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {filteredPratos.map((prato) => (
                <tr key={prato._id}>
                  <td className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] border-b border-l hidden md:table-cell">{prato._id}</td>
                  <td className="border p-2 hidden md:table-cell">{prato.pratoType}</td>
                  <td className="border p-2">
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                      {prato.prato}
                    </div>
                  </td>
                  <td className="border p-2">
                    <div className="flex items-center">
                      <button
                        className="flex-1 px-2 py-1 bg-green-500 hover:bg-green-700 text-white rounded-md mr-1"
                        onClick={() => handleEdit(prato._id)}
                      >
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faEdit} className="mr-2" />
                          <span className="ml-2 hidden md:inline">EDITAR</span>
                        </div>
                      </button>
                      <button
                        className="flex-1 px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md ml-1"
                        onClick={() => handleDelete(prato._id)}
                      >
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                          <span className="ml-2 hidden md:inline">DELETAR</span>
                        </div>
                      </button>


                    </div>
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
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="border border-gray-300 hover:shadow-md mx-2 cursor-pointer">
            <div className="bg-white p-6 rounded-md shadow-lg w-64">
              <p className="text-gray-800 break-words">
                <span className="font-bold">TEM CERTEZA QUE DESEJA DELETAR O PRATO DE ID:</span> {deletePratoId}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  className="mr-2 flex-1 px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md"
                  onClick={confirmDelete}
                >
                  SIM
                </button>
                <button
                  className="px-4 flex-1 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md"
                  onClick={cancelDelete}
                >
                  NÃO
                </button>
              </div>
            </div>
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
          <div className="p-4 w-full">
            {/* Formulário de edição do prato */}
            <div className="w-full">

              <h2 className="text-2xl font-semibold mb-4">EDITAR PRATO</h2>
              <label className="block mb-2">
                NOME DO PRATO:
                <input
                  type="text"
                  className="border p-2 w-full"
                  onChange={(e) => setEditedNome(e.target.value)}
                />
              </label>
              <label className="block mb-2">
                TIPO DO PRATO:
                <select
                  value={editedTipo}
                  onChange={(e) => setEditedTipo(e.target.value)}
                  className="border p-2 w-full"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="comum">Comum</option>
                  <option value="vegetariano">Vegetariano</option>
                  <option value="acompanhamento">Acompanhamento</option>
                </select>
              </label>

              <div className="flex justify-between mt-4">
                <div className="flex-1 mr-4">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    onClick={handleEditPrato}
                  >
                    CONFIRMAR
                  </button>
                </div>
              </div>
            </div>
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
              maxHeight: '100vh',
              height: '450px',
              width: '100vh',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <CRUDAddPratos closeModal={() => setAddPratoModalOpen(false)} refreshPratos={fetchPratos} />
        </Modal>
      )}
    </div>
  );
};

export default CRUDPrato;