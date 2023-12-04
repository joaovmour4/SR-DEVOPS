import React from "react";
import Modal from "react-modal";

const PurchaseHistoryModal = ({ isOpen, closeModal, purchaseHistory }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          height: "70%",
          width: "80%",
          margin: "auto",
          borderRadius: "10px",
        },
      }}
    >
      <div className="flex justify-end">
        <button
          className="text-red-500 hover:text-red-700 text-xl font-bold cursor-pointer"
          onClick={closeModal}
        >
          X
        </button>
      </div>
      <h2 className="text-center">Histórico de Compras</h2>
      <ul>
        {purchaseHistory.map((purchase, index) => (
          <li key={index}>{/* Renderize as informações da compra aqui */}</li>
        ))}
      </ul>
    </Modal>
  );
};

export default PurchaseHistoryModal;
