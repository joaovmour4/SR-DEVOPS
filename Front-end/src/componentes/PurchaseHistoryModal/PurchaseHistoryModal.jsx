import React from 'react';
import Modal from 'react-modal';

const PurchaseHistoryModal = ({ isOpen, closeModal, purchaseHistory }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-96 max-h-96 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Histórico de Compras</h2>
        <div className="space-y-4">
          {purchaseHistory.map((purchase) => (
            <div key={purchase._id} className="border-b pb-2">
              <p className="font-bold">ID: {purchase._id}</p>
              <p>Usuário ID: {purchase.userId}</p>
              <p>Quantidade: {purchase.quantity}</p>
              <p>Valor: {purchase.value}</p>
              <p>Data da Compra: {new Date(purchase.purchaseDate).toLocaleString()}</p>
            </div>
          ))}
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={closeModal}
        >
          Fechar
        </button>
      </div>
    </Modal>
  );
};

export default PurchaseHistoryModal;
