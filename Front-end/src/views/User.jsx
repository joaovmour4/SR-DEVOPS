import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

export default function User() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main className="h-screen flex flex-col">
        <div className="h-80 flex flex-col items-center bg-gray-300 p-4 mb-8">
          <div className="w-48 h-48 rounded-full bg-white mb-2"></div>
          <div className="w-full text-center">
            <div className="w-full text-center">
              <p className="w-80 p-2 rounded mb-2 mx-auto">NOME DO USER</p>
              <p>NÍVEL</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="mb-4">
            <button
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={openModal}
            >
              HISTÓRICO
            </button>
          </div>
          <div>
          <Link to="/pagamento">
            <button className="p-2 bg-green-500 text-white rounded hover:bg-green-700">
              PAGAMENTO
            </button>
          </Link>  
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
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
        </Modal>
      </main>
    </>
  );
}
