import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import jsPDF from 'jspdf';
import { AuthContext } from '../../Context/AuthContext';

const CRUDAddUsers = ({ closeModal, refreshUsers }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');


  const handleAddUser = async () => {
    try {
      const userSubsidio = true;
      const response = await axios.post("http://localhost:3000/user", {
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword,
        userSubsidio: userSubsidio, // Include userSubsidio in the request payload
      });

      console.log('Novo usuário criado com sucesso!');
      closeModal();
      refreshUsers();
    } catch (error) {
      console.error('Erro ao criar novo usuário:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Novo Usuário</h2>
      <label className="block mb-2">
        Nome:
        <input
          type="text"
          className="border p-2 w-full"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <label className="block mb-2">
        Email:
        <input
          type="text"
          className="border p-2 w-full"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </label>
      <label className="block mb-2">
        Senha:
        <input
          type="password"
          className="border p-2 w-full"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </label>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus.outline.none focus.shadow.outline mx-auto mt-4"
        onClick={handleAddUser}
      >
        Criar Usuário
      </button>
    </div>
  );
};

const CRUDUser = () => {
  const authContext = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [viewHistoryUserId, setViewHistoryUserId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUserName, setEditedUserName] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [tempUserSubsidio, setTempUserSubsidio] = useState(null);
  const [tempEditedUserName, setTempEditedUserName] = useState('');
  const [tempUserEmail, setTempUserEmail] = useState('');
  const [tempUserPassword, setTempUserPassword] = useState('');
  const [userSubsidio, setUserSubsidio] = useState(false);
  const [originalUserSubsidio, setOriginalUserSubsidio] = useState(null);


  const isAdmin = authContext.user && authContext.user.userCargo === 'admin';
  const isTec = authContext.user && authContext.user.userCargo === 'tec';

  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Histórico de Compras', 20, 10);

    purchaseHistory.forEach((purchase, index) => {
      const startY = 20 + index * 60;

      doc.setFont('bold');
      doc.setFontSize(12);
      doc.text(`ID da Compra: ${purchase._id.toUpperCase()}`, 20, startY);
      doc.text(`ID do Usuário: ${purchase.userId.toUpperCase()}`, 20, startY + 10);
      doc.text(`Quantidade: ${purchase.quantity}`, 20, startY + 20);
      doc.text(`Valor: ${purchase.value}`, 20, startY + 30);

      // Formatação da data
      const formattedDate = new Date(purchase.purchaseDate).toLocaleString();
      doc.text(`Data da Compra: ${formattedDate}`, 20, startY + 40);

      // Linha separadora
      doc.setLineWidth(0.5);
      doc.line(20, startY + 50, 190, startY + 50);

      // Nova linha para a próxima compra
      doc.text('', 20, startY + 60);

      // Resetar estilo para o próximo item
      doc.setFont('normal');
    });

    doc.save('historico_compras.pdf');
  };



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user', {
          headers: {
            Authorization: `Bearer ${authContext.user.jwtToken.token}`,
          },
        });

        const usersWithBooleanSubsidio = response.data.message.map((user) => ({
          ...user,
          userSubsidio: user.userSubsidio ? 'Sim' : 'Nao',
        }));

        setUsers(usersWithBooleanSubsidio);
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
      }
    };

    fetchUsers();
  }, [authContext.user.jwtToken.token, deleteUserId, isDeleteModalOpen]);

  const handleEditUser = async () => {
    try {
      const editedUserName = tempEditedUserName || '';
      const userEmail = tempUserEmail || '';
      const userPassword = tempUserPassword || '';
      const userSubsidioValue = tempUserSubsidio === null ? null : tempUserSubsidio.toString();
const userData = {
  userName: editedUserName,
  userEmail: userEmail,
  userSubsidio: userSubsidioValue,
  userPassword: userPassword,
};



      



      console.log('userData:', userData);

      const response = await axios.put(
        `http://localhost:3000/user/${editUserId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${authContext.user.jwtToken.token}`,
          },
        }
      );

      console.log('Dados do usuário atualizados com sucesso!');
      setEditUserId(null);
      setEditModalOpen(false);

      const updatedUsers = users.map((user) => {
        if (user._id === editUserId) {
          return { ...user, userName: editedUserName, userSubsidio: userSubsidioValue };
        }
        return user;
      });

      setUsers(updatedUsers);
    } catch (error) {
      console.error('Erro ao atualizar os dados do usuário:', error);
    }
  };




  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    setEditUserId(userId);
    setEditedUserName(userToEdit.userName);
    setUserEmail(userToEdit.userEmail);
    setNewUserPassword('');
    setOriginalUserSubsidio(userToEdit.userSubsidio); // Salve o valor original
    setTempUserSubsidio(userToEdit.userSubsidio);
    setEditModalOpen(true);
  };

  const handleDelete = (userId) => {
    setDeleteUserId(userId);
    setDeleteModalOpen(true);
  };

  const handleViewHistory = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/purchase`, {
        headers: {
          Authorization: `Bearer ${authContext.user.jwtToken.token}`,
        },
      });

      if (response.data.message) {
        const purchases = response.data.message;
        const userPurchases = purchases.filter((purchase) => purchase.userId === userId);

        if (userPurchases.length > 0) {
          setPurchaseHistory(userPurchases);
          setViewHistoryUserId(userId);
          setHistoryModalOpen(true);
        } else {
          console.warn('O usuário não possui compras.');
          alert('O usuário não possui compras.');
        }
      } else {
        console.error('Resposta da compra não contém a propriedade "message".', response.data);
      }
    } catch (error) {
      console.error('Erro ao obter dados da compra:', error);
    }
  };




  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/user/${deleteUserId}`, {
        headers: {
          Authorization: `Bearer ${authContext.user.jwtToken.token}`,
        },
      });

      setDeleteUserId(null);
      setDeleteModalOpen(false);
      console.log('Usuário deletado com sucesso!');
      const updatedUsers = users.filter((user) => user._id !== deleteUserId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const cancelDelete = () => {
    setDeleteUserId(null);
    setDeleteModalOpen(false);
  };

  const closeModal = () => {
    setHistoryModalOpen(false);
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

      {/* <CRUDAddUsers/> */}

      {/* Tabela de usuários */}
      <div className="flex-1 border border-gray-300 rounded-md p-4 overflow-x-auto w-3/5">
        {users.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Nome</th>
                <th className="border p-2">Subsídio</th>
                <th className="border p-2">Cargo</th>
                <th className="border p-2">E-mail</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border p-2">{user._id}</td>
                  <td className="border p-2">{user.userName}</td>
                  <td className="border p-2">{user.userSubsidio}</td>
                  <td className="border p-2">{user.userCargo}</td>
                  <td className="border p-2">{user.userEmail}</td>
                  <td className="border p-2 flex">
                    {isAdmin && (
                      <>
                        <button
                          className="mx-1 flex-1 px-2 py-1 bg-blue-500 hover:bg-blue-900 text-white rounded-md"
                          onClick={() => handleEdit(user._id)}
                        >
                          Editar
                        </button>
                        <button
                          className="mx-1 flex-1 px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md"
                          onClick={() => handleDelete(user._id)}
                        >
                          Deletar
                        </button>
                      </>
                    )}
                    {(isAdmin || isTec) && (
                      <button
                        className="mx-1 px-2 py-1 flex-1 bg-green-500 hover:bg-green-700 text-white rounded-md"
                        onClick={() => handleViewHistory(user._id)}
                      >
                        Histórico
                      </button>

                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum usuário encontrado.</p>
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      {isDeleteModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <p>{`Tem certeza que deseja deletar o usuário ${viewHistoryUserId} (ID: ${deleteUserId})?`}</p>
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

      {/* Modal de visualização de histórico */}
      {isHistoryModalOpen && (
        <Modal
          isOpen={isHistoryModalOpen}
          onRequestClose={closeModal}
          contentLabel="Histórico de Compras"
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
              maxWidth: '400px',
              width: '100%',
              maxHeight: '100vh',
              height: '100vh',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Histórico de Compras</h2>
            {purchaseHistory.length > 0 ? (
              <div>
                {purchaseHistory.map((purchase) => (
                  <div key={purchase._id} className="mb-4">
                    <p>ID da Compra: {purchase._id}</p>
                    <p>ID do Usuário: {purchase.userId}</p>
                    <p>Quantidade: {purchase.quantity}</p>
                    <p>Valor: {purchase.value}</p>
                    <p>Data da Compra: {purchase.purchaseDate}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Nenhuma compra encontrada.</p>
            )}
            <button
              className="flex-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus.outline.none focus.shadow.outline mt-4 mr-2"
              onClick={closeModal}
            >
              Fechar
            </button>
            <button
              className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus.outline.none focus.shadow.outline mt-4 ml-2"
              onClick={generatePDF}
            >
              Gerar PDF
            </button>
          </div>
        </Modal>
      )}


      {/* Modal de edição de usuário */}
      {editModalOpen && (
        <Modal
          isOpen={editModalOpen}
          onRequestClose={() => setEditModalOpen(false)}
          contentLabel="Editar Usuário"
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
              width: '100vh',
              height: '100vh',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">Editar Usuário</h2>
            <label className="block mb-2">
              Novo Nome de Usuário:
              <input
                type="text"
                className="border p-2 w-full"
                value={editedUserName}
                onChange={(e) => setEditedUserName(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              Novo Email:
              <input
                type="text"
                className="border p-2 w-full"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              Nova Senha:
              <input
                type="password"
                className="border p-2 w-full"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
              />
            </label>
            <label className="block mb-4">
              Subsídio:
              <select
  className="border p-2 w-full"
  value={tempUserSubsidio === null ? "Selecione" : tempUserSubsidio.toString()}
  onChange={(e) => setTempUserSubsidio(e.target.value === "true" ? true : false)}
>
  <option value="Selecione" disabled hidden>Selecione</option>
  <option value="true">Sim</option>
  <option value="false">Não</option>
</select>

            </label>

            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus.outline.none focus.shadow.outline mx-auto mt-4"
              onClick={handleEditUser}
            >
              CONFIRMAR
            </button>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default CRUDUser;
