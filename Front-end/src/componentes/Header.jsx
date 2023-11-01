import React from "react";

export default function Header(){
    return (
        <>
            <header>
                <img src="./img/RU-por-extenso-b 1.png" alt="Imagem do RU da Unifesspa"/>
            </header>
            <nav class="navegacao">
                <a class="cardapio" href="./cardapio.html"><img class="cadapio_img" src="./img/cardapio.png" alt="img do cardapio"/>
                    <label class="texto">
                        CARDÁPIO
                    </label>
                </a>
                <a class="login" href="./login.html"><img class="login_img" src="./img/login.png" alt="img do login"/>
                    <label class="texto">
                        LOGIN
                    </label>
                </a>
            </nav>
        </>
        )
} 