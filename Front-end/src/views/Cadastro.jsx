import React from "react";
import imgAluno from "../img/aluno.png";

export default function Cadastro() {
  return (
    <>
      <main className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <img className="w-20" src={imgAluno} alt="img representando os alunos" />
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col items-center gap-2">
              <input className="bg-gray-300 rounded-md p-2 box-shadow" type="text" placeholder="NOME" />
              <input className="bg-gray-300 rounded-md p-2 box-shadow" type="email" placeholder="E-MAIL" autoComplete="on" />
              <input className="bg-gray-300 rounded-md p-2 box-shadow" type="password" placeholder="SENHA" />
            </div>
            <button className="bg-green-500 text-white max-w-28 p-2 hover:bg-green-600 rounded-md mt-4 mx-auto">
              CADASTRAR
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
