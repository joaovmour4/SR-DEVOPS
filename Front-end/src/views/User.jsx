import React, { useState, useEffect } from "react";
import UserInfo from "../componentes/UserInfo/UserInfo";
import UserButtons from "../componentes/UserButton/UserButton";
import PurchaseHistoryModal from "../componentes/PurchaseHistoryModal/PurchaseHistoryModal";
import AdminButtons from "../componentes/AdminButtons/AdminButtons"; 
import ModalGerenciamentoUsuarios from "../componentes/AdminManagerUser/AdminManagerUser";
import SearchUser from "../componentes/SearchUser/SeachUser" 
import UpdatePratos from "../componentes/UpdatePratos/UpdatePratos"; 
import { useLocation } from "react-router-dom";
import axios from 'axios';
import jwt from 'jwt-decode'

const User = ({ userRole }) => {
  const { state } = useLocation();
  const [userName, setUserName] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleUser, setRoleUser] = useState('')

  useEffect(() => {
    const decoded = jwt.decode(localStorage.getItem('token'))
    const userName = decoded.userName;
    const userRole = decoded.userCargo;
    const userSubsidio = decoded.userSubsidio;

    setRoleUser(userRole)

    setUserName(userName);
    if (userRole === 'admin') {
      setIsAdmin(true);
    }
  },[])





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

  return (
    <>
      <main className="h-screen flex flex-col">
        <UserInfo userName={userName} userRole={roleUser} />
        <UserButtons openModal={openModal} />

        {isAdmin && (
          <>
            <AdminButtons abrirModal={() => console.log('Abrir modal de admin')} />
            <SearchUser handleClick={() => console.log('Buscar usuário')} />
            <UpdatePratos handleSubmit={() => console.log('Atualizar pratos')} />
          </>
        )}

        <ModalGerenciamentoUsuarios isOpen={isModalOpen} fecharModal={closeModal} listaUsuarios={[]} />
        <PurchaseHistoryModal isOpen={isModalOpen} closeModal={closeModal} purchaseHistory={purchaseHistory} />
      </main>
    </>
  );
};

export default User;