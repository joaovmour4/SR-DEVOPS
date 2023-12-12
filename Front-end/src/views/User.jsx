import React, { useState, useEffect, useContext } from "react";
import UserInfo from "../componentes/UserInfo/UserInfo";
import UserButtons from "../componentes/UserButton/UserButton";
import AdminButtons from "../componentes/AdminButtons/AdminButtons";
import PurchaseHistoryModal from "../componentes/PurchaseHistoryModal/PurchaseHistoryModal";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import Modal from 'react-modal';

// Defina o elemento raiz do aplicativo para o Modal
Modal.setAppElement('#root'); // Substitua '#root' pelo seletor correto do elemento raiz

const User = () => {
  const { signed, user } = useContext(AuthContext);

  const [userName, setUserName] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleUser, setRoleUser] = useState('');

  useEffect(() => {
    if (signed) {
      setRoleUser(user.userCargo);
      setIsAdmin(roleUser === 'admin');
      setUserName(user.userName);
    }
  }, [signed, roleUser, user]);

  const openModal = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado.');
        return;
      }
  
      const response = await axios.get('http://localhost:3000/user/purchases', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Resposta da requisição:', response.data);
      setPurchaseHistory(response.data.message);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erro ao obter o histórico de compras:', error.response);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchUser = () => {
    console.log('Buscar usuário');
  };

  const handleUpdatePratos = () => {
    console.log('Atualizar pratos');
  };

  return (
    <div>
      {signed ? (
        <main className="h-screen flex flex-col mb-12">
          <UserInfo userName={userName} userRole={roleUser} />
          
          {isAdmin ? (
            <AdminButtons
              handleSearchUser={handleSearchUser}
              handleUpdatePratos={handleUpdatePratos}
              listaUsuarios={[]} 
            />
          ) : (
            <UserButtons openModal={openModal} />
          )}

          <PurchaseHistoryModal isOpen={isModalOpen} closeModal={closeModal} purchaseHistory={purchaseHistory} />
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default User;
