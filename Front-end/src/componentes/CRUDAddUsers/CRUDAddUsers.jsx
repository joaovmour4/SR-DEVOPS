import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const CRUDAddUsers = ({ refreshUsers }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user", {
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword,
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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus.outline.none focus.shadow.outline mx-auto mt-4"
        onClick={openModal}
      >
        Adicionar Usuário
      </button>

      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Adicionar Usuário"
        >
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
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus.outline.none focus.shadow.outline mx-auto mt-4"
              onClick={closeModal}
            >
              Fechar Modal
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CRUDAddUsers;
