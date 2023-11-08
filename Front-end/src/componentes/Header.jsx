import React from "react";
import imgRU from "../img/RU-por-extenso-b 1.png";
import imgCardapio from "../img/cardapio.png";
import imgLogin from "../img/login.png";


export default function Header(){
    return (
        <section>
            <header className="bg-cor-um flex grow-0 justify-center">
                <img src={imgRU} alt="Imagem do RU da Unifesspa"/>
            </header>
            <nav className="bg-cor-dois flex justify-center first-letter gap-x-4 py-2 flex-grow-0">
                <a className="flex flex-col items-center" href="./cardapio.html">
                    <img className="h-6 w-6" src={imgCardapio} alt="img do cardapio"/>
                    <label className="text-sm">
                        CARDÁPIO
                    </label>
                </a>
                <a className="flex flex-col items-center" href="./login.html">
                    <img className="h-6 w-6" src={imgLogin} alt="img do login"/>
                    <label className="bg-gray-300 text-sm">
                        LOGIN
                    </label>
                </a>
            </nav>
        </section>
        )
} 