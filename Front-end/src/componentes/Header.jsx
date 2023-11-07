import React from "react";
import imgRU from "../img/RU-por-extenso-b 1.png";
import imgCardapio from "../img/cardapio.png";
import imgLogin from "../img/login.png";


export default function Header(){
    return (
        <section>
            <header style={{backgroundColor: '#2cbc63'}}>
                <img src={imgRU} alt="Imagem do RU da Unifesspa"/>
            </header>
            <nav class="navegacao" style={{backgroundColor: "#D9D9D9"}}>
                <a class="cardapio" href="./cardapio.html">
                    <img class="cadapio_img" src={imgCardapio} alt="img do cardapio"/>
                    <label class="texto">
                        CARDÁPIO
                    </label>
                </a>
                <a class="login" href="./login.html">
                    <img class="login_img" src={imgLogin} alt="img do login"/>
                    <label class="texto">
                        LOGIN
                    </label>
                </a>
            </nav>
        </section>
        )
} 