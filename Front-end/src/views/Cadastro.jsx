import React from "react";
import imgAluno from "../img/aluno.png"

export default function Cadastro(){
    return(
        <>
            <main className="container flex flex-col justify-evenly items-center flex-grow">
                <div className="aluno flex flex-col justify-center items-center gap-1">
                        <img className="w-20" src={imgAluno} alt="img representando os alunos" />
                        <form className="form_aluno" onSubmit={(e) => e.preventDefault()}>
                    <div className="campos_form flex flex-col items-center gap-1.5">
                        <input id="user" className="nome bg-gray-300 rounded-md p-2 box-shadow" type="text" placeholder="NOME" />
                        <input id="email" className="email bg-gray-300 rounded-md p-2 box-shadow" type="email" placeholder="E-MAIL" autoComplete="on" />
                        <input id="password" className="senha bg-gray-300 rounded-md p-2 box-shadow" type="password" placeholder="SENHA" />
                    </div>
                    <button className="cadastroButton bg-green-500 text-white max-w-28 p-2 hover:bg-green-600" id="cadastroButton">
                        CADASTRAR
                    </button>
                        </form>
                </div>
            </main>
        </>
    );
}