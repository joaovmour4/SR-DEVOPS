import React from "react";
import imgAluno from "../img/aluno.png"

export default function Cadastro(){
    return(
        <>
            <main>
                <div>
                    <img src={imgAluno} alt="img simbolico para perfil aluno"/>
                </div>
                <form>
                    <div>
                        <input type="text" id="user" placeholder="NOME"/>
                        <input id="email" type="email" placeholder="E-MAIL" autoComplete="on"/>
                        <input type="password" id="password" placeholder="SENHA"/>
                    </div>
                    <button id="cadastroButton">CADASTRO</button>
                </form>
            </main>
        </>
    );
}