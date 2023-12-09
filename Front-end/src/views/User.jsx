import React, { useState, useEffect, useContext } from "react";
import UserInfo from "../componentes/UserInfo/UserInfo";
import UserButtons from "../componentes/UserButton/UserButton";
import PurchaseHistoryModal from "../componentes/PurchaseHistoryModal/PurchaseHistoryModal";
import AdminButtons from "../componentes/AdminButtons/AdminButtons"
import { Navigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../Context/AuthContext';

const User = () => {

  const { signed, user } = useContext(AuthContext)
  
  const [userName, setUserName] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleUser, setRoleUser] = useState('');

  useEffect(() => {
    if (signed) {
      setRoleUser(user.userCargo)
      if (roleUser === 'admin') {
        setIsAdmin(true)
      }
      setUserName(user.userName)
    }
  },[signed])

  const openModal = async () => {
    try {
      const response = await axios.get('/user/purchases', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setPurchaseHistory(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erro ao obter o histórico de compras:', error);
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
    <>
      {signed ? (
        <main className="h-screen flex flex-col mb-12">
        <UserInfo userName={userName} userRole={roleUser} />
        <UserButtons openModal={openModal} />

        {roleUser === 'admin' && (
          <AdminButtons
            isOpen={isModalOpen}
            abrirModal={openModal}
            fecharModal={closeModal}
            handleSearchUser={handleSearchUser}
            handleUpdatePratos={handleUpdatePratos}
            listaUsuarios={[]}  // lista de usuários
          />
        )}

        <PurchaseHistoryModal isOpen={isModalOpen} closeModal={closeModal} purchaseHistory={purchaseHistory} />
      </main>
      ): (
        <Navigate to="/login" />
      )
      }
    </>
  );
};

export default User;