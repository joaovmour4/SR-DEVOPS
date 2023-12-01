  import React, { useState } from "react";
  import Modal from "react-modal";

  export default function Admin() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("SEGUNDA");
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

    const changeTab = (day) => {
      setActiveTab(day);
    };

    const handleSubmit = () => {
      // Handle form submission logic here
      setSuccessMessage("Dados enviados com sucesso!");
    };

    const isMobile = window.innerWidth <= 767; // Temporary solution for media queries

    const daysOfWeek = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];

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
              className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
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
            onClick={openModal}
          >
            Atualizar Pratos
          </button>
        </div>

<Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  style={{
    content: {
      height: "80%",
      width: isMobile ? "calc(100% - 100px)" : "60%", 
      margin: "auto",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: isMobile ? "10px" : "20px",
    },
  }}
>
  <div className="flex justify-center mb-4">
    <div className="overflow-x-auto">
      {/* Exibe os três primeiros dias da semana lado a lado */}
      <div className="flex">
        {daysOfWeek.slice(0, 3).map((day) => (
          <button
            key={day}
            className={`p-2 ${
              activeTab === day ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
            } rounded hover:bg-green-700 mr-2 mb-2 ${isMobile ? 'w-full' : 'w-20'}`}
            onClick={() => changeTab(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Exibe os três últimos dias da semana lado a lado */}
      <div className="flex mt-2">
        {daysOfWeek.slice(3).map((day) => (
          <button
            key={day}
            className={`p-2 ${
              activeTab === day ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
            } rounded hover:bg-green-700 mr-2 mb-2 ${isMobile ? 'w-full' : 'w-20'}`}
            onClick={() => changeTab(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  </div>

  <div className="p-4 shadow-md w-full">
    <h2 className="text-center">{activeTab}</h2>
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
      className="p-2 bg-green-500 text-white rounded hover:bg-green-700 mt-4"
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