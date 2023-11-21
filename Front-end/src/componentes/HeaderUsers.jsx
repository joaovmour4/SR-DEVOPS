import React, { useState } from "react";
import { Link } from 'react-router-dom';
import imgRU from "../img/RU-por-extenso-b 1.png";
import imgLogout from "../img/off.png";
import imgSOS from "../img/sos.png";

export default function HeaderUser() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Aqui você implementa a lógica de logout
    // Pode ser uma chamada a uma API, remoção de tokens, etc.
    // Após o logout, atualize o estado para false
    setIsLoggedIn(false);
  };

  return (
    <section>
      <header className="bg-cor-um flex grow-0 justify-center">
        <Link to={"/"}>
          <img src={imgRU} alt="Imagem do RU da Unifesspa" />
        </Link>
      </header>
      <nav className="bg-cor-dois flex justify-center first-letter gap-x-4 py-2 flex-grow-0">
        <p className="flex flex-col items-center">
          <img className="h-8 w-8 fill-black" src={imgLogout} alt="ícone de logout" />
          {isLoggedIn ? (
            <Link className="bg-gray-300 text-sm" to={"/login"} onClick={handleLogout}>
              SAIR
            </Link>
          ) : (
            <Link className="bg-gray-300 text-sm" to={"/login"}>
              LOGIN
            </Link>
          )}
        </p>
        <p className="flex flex-col items-center">
          <img className="h-8 w-8" src={imgSOS} alt="ícone de ajuda" />
          <Link className="text-sm" to={"/ajuda"}>
            AJUDA
          </Link>
        </p>
      </nav>
    </section>
  );
}
