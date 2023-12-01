import React from "react";
import instagram from "../svg/instagram.svg";
import contato from "../svg/contato.svg";
import informacao from "../img/informacao.png";
import brasil from "../img/brasil.png";

export default function Footer(){
    return (
        <>
        <footer className="flex flex-col flex-grow-0">
            <div>
                <div className="bg-cor-dois flex justify-center gap-8 py-1">
                    <a href="https://www.unifesspa.edu.br/fale-conosco">
                        <img src={contato} alt=""/>
                    </a>
                    <a href="https://www.instagram.com/unifesspa/">
                        <img src={instagram} alt=""/>
                    </a>
                </div>
                <div className="bg-cor-quatro flex flex-wrap justify-between p-2 md:p-4">
                    <picture class="informacao">
                        <img src={informacao} alt="imagem informação"/>
                    </picture>
                    <picture class="brasil">
                        <img src={brasil} alt="imagem da logo do brasil"/>
                    </picture>
                </div>
            </div>
        </footer>
        </>
    )
}