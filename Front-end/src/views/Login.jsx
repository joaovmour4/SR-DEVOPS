import React from "react";

export default function Login(){
    return(
        <>
            <main className="container">
            <div className="aluno">
            <img src="./img/aluno.png" alt="img representando os alunos" className="img_aluno" />
            <form className="form_aluno" onSubmit={(e) => e.preventDefault()}>
            <input
                id="user"
                className="nome bg-gray-300 border-0 rounded-md p-2 focus:outline-none focus-visible:outline-solid"
                type="email"
                name="username"
                placeholder="E-MAIL"
                autoComplete="on"
            />
            <input
                id="password"
                className="senha bg-gray-300 border-0 rounded-md p-2 focus:outline-none focus-visible:outline-solid"
                type="password"
                name="pwd"
                placeholder="SENHA"
          />
          <div className="buttons">
            <button className="entrar_aluno bg-green-500 text-white">ENTRAR</button>
            <button className="cadastroVisitante bg-gray-200">CADASTRO VISITANTE</button>
          </div>
        </form>
      </div>
    </main>
        </>
    )
}