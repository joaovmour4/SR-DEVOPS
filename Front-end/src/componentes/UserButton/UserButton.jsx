import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-modal';
import jsPDF from 'jspdf';

const UserButtons = ({ openModal }) => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [editedUserName, setEditedUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);

  const fetchPurchaseHistory = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/purchases', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setPurchaseHistory(response.data.message);
      setHistoryModalOpen(true);
    } catch (error) {
      console.error('Error fetching purchase history:', error.response);
    }
  };

  const closeModal = () => {
    setHistoryModalOpen(false);
  };

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

      const formattedDate = new Date(purchase.purchaseDate).toLocaleString();
      doc.text(`Data da Compra: ${formattedDate}`, 20, startY + 40);

      doc.setLineWidth(0.5);
      doc.line(20, startY + 50, 190, startY + 50);

      doc.text('', 20, startY + 60);

      doc.setFont('normal');
    });

    doc.save('historico_compras.pdf');
  };

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const handleEditUser = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/user",
        {
          userName: editedUserName,
          userEmail: userEmail,
          userPassword: newUserPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("User data updated successfully:", response.data);

      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user data:", error.response);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="mb-4">
        <button
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700 min-w-[200px]"
          onClick={openEditModal}
        >
          ATUALIZAR DADOS
        </button>
      </div>
      <div className="mb-4">
        <button
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700 min-w-[200px]"
          onClick={fetchPurchaseHistory}
        >
          HISTÓRICO
        </button>
      </div>
      <div>
        <Link to="/pagamento">
          <button className="p-2 bg-green-500 text-white rounded hover:bg-green-700 min-w-[200px]">
            PAGAMENTO
          </button>
        </Link>
      </div>

      {/* Modal for Purchase History */}
      <Modal
        isOpen={isHistoryModalOpen}
        onRequestClose={closeModal}
        contentLabel="Histórico de Compras"
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
          <div className="flex">
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
        </div>
      </Modal>
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
            maxHeight: '100vh',
            width: '100vh',
            height:'400px',
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
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus.outline.none focus.shadow.outline mx-auto mt-4"
            onClick={handleEditUser}
          >
            CONFIRMAR
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserButtons;
