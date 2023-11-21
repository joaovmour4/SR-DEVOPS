// User.jsx
import React from "react";
import HeaderUser from "../componentes/HeaderUsers";
import imgUser from "../img/userRamon.jpg";

export default function User() {
  return (
    <>
      <HeaderUser />
      <main className="flex flex-col min-h-screen">
        <div className="container mx-auto mt-8">
          <div className="flex flex-col md:flex-row">
            {/* Parte Esquerda - Informações do Usuário */}
            <div className="md:w-1/2">
              <img
                src={imgUser}
                alt="Imagem do Usuário"
                className="rounded-full w-20 h-20 mx-auto md:mx-0 md:mr-4"
              />

              <div className="mt-4 text-center md:text-left">
                <h2 className="text-xl font-bold">Ramon Castro Barbosa</h2>
                <p>Cargo: Aluno</p>
              </div>
            </div>

            {/* Parte Direita - Lista de Compras ou similar */}
            <div className="mt-4 md:w-1/2 md:ml-4">
              <div className="bg-gray-100 p-4 rounded flex flex-col">
                <h3 className="text-lg font-bold mb-4">Lista de Compras</h3>
                {/* Adicione aqui a lógica para exibir a lista de compras */}
                <ul className="flex-1 overflow-y-auto">
                  <li>Item 1</li>
                  <li>Item 2</li>
                  <li>Item 3</li>
                  {/* ... */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
