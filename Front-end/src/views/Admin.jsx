import React, { useState } from "react";
import Modal from "react-modal";

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdatePratosOpen, setIsUpdatePratosOpen] = useState(false);
  const [prato, setPrato] = useState("");
  const [vegetariano, setVegetariano] = useState("");
  const [acompanhamentos, setAcompanhamentos] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUpdatePratos = () => {
    setIsUpdatePratosOpen(true);
  };

  const closeUpdatePratos = () => {
    setIsUpdatePratosOpen(false);
  };

  const handleSubmit = (day) => {
    const setSuccessMessages = (prevMessages) => ({
        ...prevMessages,
        [day]: "Dados enviados com sucesso!",
      });
      const setFormData = {
        prato: "",
        vegetariano: "",
        acompanhamentos: "",
      };
    };


  return (
    <div className="h-screen flex flex-col bg-gray-200">
      <div className="h-90 flex flex-col items-center bg-gray-300 p-4">
        <div className="w-48 h-48 rounded-full bg-white mb-2"></div>
        <div className="w-full text-center">
          <p className="w-80 p-2 rounded mb-2 mx-auto">ADM</p>
          <input
            type="text"
            placeholder="Buscar usuário..."
            className="p-2 border border-gray-400 rounded mr-2 mb-5"
          />
          <button
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={openModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m0 0l-6-6m6 6l-6 6m6-6l6 6"
              />
            </svg>
          </button>
        </div>
        <button
          className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
          onClick={openUpdatePratos}
        >
          Atualizar Pratos
        </button>
      </div>

      <main className="flex justify-center items-center flex-1">
        {/* ------------------------------------------------------- */}
      </main>
      <Modal
        isOpen={isUpdatePratosOpen}
        onRequestClose={closeUpdatePratos}
        style={{
          content: {
            height: "80%",
            width: "80%",
            margin: "auto",
            borderRadius: "10px",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          },
        }}
      >
        {/* SEGUNDA */}
        <div className="p-4 shadow-md">
          <h2 className="text-center">SEGUNDA</h2>
          <div className="mb-4">
            <p>Prato:</p>
            <input
              type="text"
              value={prato}
              onChange={(e) => setPrato(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <p>Vegetariano:</p>
            <input
              type="text"
              value={vegetariano}
              onChange={(e) => setVegetariano(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <div>
            <p>Acompanhamentos:</p>
            <input
              type="text"
              value={acompanhamentos}
              onChange={(e) => setAcompanhamentos(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <button
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4"
            onClick={handleSubmit}
          >
            Enviar
          </button>
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
        </div>
        {/* TERÇA */}
        <div className="p-4 shadow-md">
          <h2 className="text-center">TERÇA</h2>
          <div className="mb-4">
            <p>Prato:</p>
            <input
              type="text"
              value={prato}
              onChange={(e) => setPrato(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <p>Vegetariano:</p>
            <input
              type="text"
              value={vegetariano}
              onChange={(e) => setVegetariano(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <div>
            <p>Acompanhamentos:</p>
            <input
              type="text"
              value={acompanhamentos}
              onChange={(e) => setAcompanhamentos(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <button
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4"
            onClick={handleSubmit}
          >
            Enviar
          </button>
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
        </div>
        {/* QUARTA */}
        <div className="p-4 shadow-md">
          <h2 className="text-center">QUARTA</h2>
          <div className="mb-4">
            <p>Prato:</p>
            <input
              type="text"
              value={prato}
              onChange={(e) => setPrato(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <p>Vegetariano:</p>
            <input
              type="text"
              value={vegetariano}
              onChange={(e) => setVegetariano(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <div>
            <p>Acompanhamentos:</p>
            <input
              type="text"
              value={acompanhamentos}
              onChange={(e) => setAcompanhamentos(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <button
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4"
            onClick={handleSubmit}
          >
            Enviar
          </button>
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
        </div>
        {/* QUINTA */}
        <div className="p-4 shadow-md">
          <h2 className="text-center">QUINTA</h2>
          <div className="mb-4">
            <p>Prato:</p>
            <input
              type="text"
              value={prato}
              onChange={(e) => setPrato(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <p>Vegetariano:</p>
            <input
              type="text"
              value={vegetariano}
              onChange={(e) => setVegetariano(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <div>
            <p>Acompanhamentos:</p>
            <input
              type="text"
              value={acompanhamentos}
              onChange={(e) => setAcompanhamentos(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <button
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4"
            onClick={handleSubmit}
          >
            Enviar
          </button>
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
        </div>
        {/* SEXTA */}
        <div className="p-4 shadow-md">
          <h2 className="text-center">SEXTA</h2>
          <div className="mb-4">
            <p>Prato:</p>
            <input
              type="text"
              value={prato}
              onChange={(e) => setPrato(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <p>Vegetariano:</p>
            <input
              type="text"
              value={vegetariano}
              onChange={(e) => setVegetariano(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <div>
            <p>Acompanhamentos:</p>
            <input
              type="text"
              value={acompanhamentos}
              onChange={(e) => setAcompanhamentos(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <button
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4"
            onClick={handleSubmit}
          >
            Enviar
          </button>
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
        </div>
        {/* SÁBADO */}
        <div className="p-4 shadow-md">
          <h2 className="text-center">SÁBADO</h2>
          <div className="mb-4">
            <p>Prato:</p>
            <input
              type="text"
              value={prato}
              onChange={(e) => setPrato(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <p>Vegetariano:</p>
            <input
              type="text"
              value={vegetariano}
              onChange={(e) => setVegetariano(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <div>
            <p>Acompanhamentos:</p>
            <input
              type="text"
              value={acompanhamentos}
              onChange={(e) => setAcompanhamentos(e.target.value)}
              className="p-2 border border-gray-400 rounded w-full"
            />
          </div>
          <button
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4"
            onClick={handleSubmit}
          >
            Enviar
          </button>
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
        </div>
      </Modal>
    </div>
  );
}
