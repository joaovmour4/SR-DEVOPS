import React, { useState, useEffect } from "react";
import UserInfo from "../componentes/UserInfo/UserInfo";
import UserButtons from "../componentes/UserButton/UserButton";
import PurchaseHistoryModal from "../componentes/PurchaseHistoryModal/PurchaseHistoryModal";
import AdminButtons from "../componentes/AdminButtons/AdminButtons"
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const User = ({ userRole }) => {
  const { state } = useLocation();
  const [userName, setUserName] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleUser, setRoleUser] = useState('')

  useEffect(() => {
    const decoded = jwtDecode(localStorage.getItem('token'))
    const userName = decoded.userName;
    const userRole = decoded.userCargo;

    setRoleUser(userRole)

    setUserName(userName);
    if (userRole === 'admin') {
      setIsAdmin(true);
    }
  }, [])

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
      <main className="h-screen flex flex-col mb-12">
        <UserInfo userName={userName} userRole={roleUser} />
        <UserButtons openModal={openModal} />

        {isAdmin && (
          <AdminButtons
            isOpen={isModalOpen}
            abrirModal={openModal}
            fecharModal={closeModal}
            handleSearchUser={handleSearchUser}
            handleUpdatePratos={handleUpdatePratos}
            listaUsuarios={[]}  // Alista de usuários
          />
        )}

        <PurchaseHistoryModal isOpen={isModalOpen} closeModal={closeModal} purchaseHistory={purchaseHistory} />
      </main>
    </>
  );
};

export default User;
