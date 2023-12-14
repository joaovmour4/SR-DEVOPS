import React, { useState, useEffect, useContext } from "react";
import UserInfo from "../componentes/UserInfo/UserInfo";
import UserButtons from "../componentes/UserButton/UserButton";
import AdminButtons from "../componentes/AdminButtons/AdminButtons";
import PurchaseHistoryModal from "../componentes/PurchaseHistoryModal/PurchaseHistoryModal";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const User = () => {
  const { signed, user } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTec, setIsTec] = useState(false);
  const [roleUser, setRoleUser] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (signed) {
      setRoleUser(user.userCargo);
      setIsAdmin(roleUser === 'admin');
      setIsTec(roleUser === 'tec')
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
  
      const response = await axios.get('http://localhost:3000/user', {
        headers: {
          Authorization: `Bearer ${authContext.user.jwtToken.token}`,
        },
      });
  
      const { userName, userEmail, userSubsidio } = response.data;
      setUserData({
        name: userName,
        email: userEmail,
        password: '',
      });
  
      setPurchaseHistory(response.data.message);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error.response);
    }
  };  ;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchUser = () => {
    console.log('Buscar usuário');
  };

  const handleUpdatePratos = () => {
    console.log('Atualizar pratos');
  };

  const handleUpdateUser = async (updatedUserData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado.');
        return;
      }

      await axios.put('http://localhost:3000/user', updatedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData((prevData) => ({
        ...prevData,
        ...updatedUserData,
      }));

      console.log('Dados do usuário atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error.response);
    }
  };

  return (
    <div>
      {signed ? (
        <main className="h-screen flex flex-col mb-12">
          <UserInfo userName={userName} userEmail={userData.email} userRole={roleUser} userSubsidio={userData.subsidio}/>

          
          {isAdmin || isTec ? (
            <AdminButtons
              handleSearchUser={handleSearchUser}
              handleUpdatePratos={handleUpdatePratos}
              listaUsuarios={[]} 
            />
          ) : (
            <UserButtons openModal={openModal} />
          )}

          <PurchaseHistoryModal isOpen={isModalOpen} closeModal={closeModal} purchaseHistory={purchaseHistory} />

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Editar Dados do Usuário"
          >
            <h2>Editar Dados do Usuário</h2>
            <form onSubmit={() => handleUpdateUser(userData)}>
              <label>
                Nome:
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </label>
              <label>
                Email:
                <input
                  type="text"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </label>
              <label>
                Senha:
                <input
                  type="password"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
              </label>
              <button type="submit">Atualizar</button>
            </form>
          </Modal>
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default User;
