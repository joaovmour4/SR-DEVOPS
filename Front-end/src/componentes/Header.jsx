import React from "react";
import { NavLink } from 'react-router-dom';
import imgRU from "../img/RU-por-extenso-b 1.png";
import imgCardapio from "../img/cardapio.png";
import imgLogin from "../img/login.png";

export default function Header() {
  return (
    <>
      <section>
        <header className="bg-cor-um flex grow-0 justify-center">
          <img src={imgRU} alt="Imagem do RU da Unifesspa" />
        </header>
        <nav className="bg-cor-dois flex justify-center first-letter gap-x-4 py-2 flex-grow-0">
          <p className="flex flex-col items-center">
            <img className="h-8 w-8 fill-black" src={imgCardapio} alt="img do cardápio" />
            <label className="text-sm">
            <a href="https://www.w3schools.com">
                CARDÁPIO
              </a>
            </label>
          </p>
          <p className="flex flex-col items-center">
            <img className="h-8 w-8" src={imgLogin} alt="img do login" />
            <p className="bg-gray-300 text-sm">
              <a href="https://www.w3schools.com">
                LOGIN
              </a>
            </p>
          </p>
        </nav>
      </section>
    </>
  );
}
