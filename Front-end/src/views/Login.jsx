import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgAcenando from "../img/aluno.png";

export default function Login() {
  const [loginEfetuado, setLoginEfetuado] = useState(false);
  const navigate = useNavigate(); 

  const realizarLogin = () => {
    setLoginEfetuado(true);

    setTimeout(() => {
      navigate("/user");
    }, );
  };

  const irCadastro = () => {
    navigate("/cadastro");
  }

  return (
    <>
     <main className="container flex flex-col justify-center items-center flex-grow min-h-screen w-full mx-auto">
        {!loginEfetuado ? (
          <div className="aluno flex flex-col items-center gap-4">
            <img className="w-32 animate-bounce" src={imgAcenando} alt="GIF acenando" />
            <form className="form_aluno text-center" onSubmit={(e) => e.preventDefault()}>
              <input
                id="user"
                className="nome bg-gray-300 rounded-md p-2 box-shadow w-64 mb-2 md:mx-4 block"
                type="email"
                name="username"
                placeholder="E-MAIL"
                autoComplete="on"
              />
              <input
                id="password"
                className="senha bg-gray-300 rounded-md p-2 box-shadow w-64 mb-2 md:mx-4 block"
                type="password"
                name="pwd"
                placeholder="SENHA"
              />
              <div className="buttons grid grid-cols-1 gap-4 w-64 mx-auto">
                <button
                  onClick={realizarLogin}
                  className="entrar_aluno bg-green-500 text-white p-2 hover:bg-green-600"
                  id="entrarAluno"
                >
                  ENTRAR
                </button>
                <button className="cadastroVisitante bg-gray-300 p-2 hover:bg-gray-200" id="cadastroVisitante" onClick={irCadastro}>
                  CADASTRO VISITANTE
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </main>
    </>
  );
}
