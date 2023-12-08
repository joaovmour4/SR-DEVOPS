import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const AdminButtons = ({ isOpen, abrirModal, fecharModal, handleSearchUser, listaUsuarios }) => {
  return (
    <div className="flex flex-col items-center gap-5 max-w-35 min-w-35">
      <div className="mb-4">
        <Link to="/controlheusuario">
          <button
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700 mt-8"
            onClick={abrirModal}
          >
            GERENCIAR USUÁRIOS
          </button>
        </Link>
      </div>
      <div>
        {/* <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleSearchUser}
        >
          BUSCAR USUÁRIO
        </button> */}
      </div>
      <div>
        <Link to="/adicionarpratos">
          <button className="p-2 bg-green-500 text-white rounded hover:bg-green-700">
            ATUALIZAR PRATOS
          </button>
        </Link>
      </div>
      <div>
        {/* <Link to="/configuracoes">
          <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            CONFIGURAÇÕES
          </button>
        </Link> */}
      </div>

      {/* Modal de Gerenciamento de Usuários */}
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
