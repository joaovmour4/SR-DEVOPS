import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faUserCog, faUtensilSpoon  } from '@fortawesome/free-solid-svg-icons';

const AdminButtons = ({ isOpen, abrirModal, fecharModal, handleSearchUser, listaUsuarios }) => {
  return (
    <div className="flex flex-col items-center gap-5 max-w-35 min-w-35">
      <div className="mb-4">
        <Link to="/listuser">
          <button
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700 mt-8 min-w-[285px]"
            onClick={abrirModal}
          >
            <FontAwesomeIcon icon={faUserCog} className="mr-2"/>
            GERENCIAR USUÁRIOS
          </button>
        </Link>
      </div>
      <div className="mb-4">
        <Link to="/adicionarpratos">
          <button className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700 min-w-[285px]">
          <FontAwesomeIcon icon={faUtensilSpoon} className="mr-2" />
            CRIAR INGREDIENTES
          </button>
        </Link>
      </div>
      <div className="mb-4">
      <Link to="/listpratos">
      <button
      className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700 min-w-[285px]"
      onClick={abrirModal}
    >
      <FontAwesomeIcon icon={faBurger} className="mr-2" />
      MONTAR PRATOS DO CARDÁPIO
    </button>
        </Link>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={fecharModal}
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
            onClick={fecharModal}
          >
            X
          </button>
        </div>
        <h2 className="text-center">Gerenciamento de Usuários</h2>
        <ul>
          {listaUsuarios.map((usuario, index) => (
            <li key={index}>{/* Renderize as informações do usuário aqui */}</li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default AdminButtons;
