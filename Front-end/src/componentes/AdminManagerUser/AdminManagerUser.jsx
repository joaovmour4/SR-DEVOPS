import React from "react";
import Modal from "react-modal";

const ModalGerenciamentoUsuarios = ({ isOpen, fecharModal, listaUsuarios }) => {
  return (
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
  );
};

export default ModalGerenciamentoUsuarios;
