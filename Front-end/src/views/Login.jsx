import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgAcenando from "../img/aluno.png";

export default function Login() {
  const [loginEfetuado, setLoginEfetuado] = useState(false);
  const navigate = useNavigate(); 
  // ovo alterar isso aqui depois para verificar se o usuario existe ou não
  const realizarLogin = () => {
    setLoginEfetuado(true);

    setTimeout(() => {
      // Simula a navegação para a página de compras após 2 segundos
      navigate("/user");
    }, 3000);
  };

  return (
    <>
     <main className="container flex flex-col justify-center items-center flex-grow min-h-screen w-full mx-auto">
        {!loginEfetuado ? (
          <div className="aluno flex flex-col items-center gap-4">
            <img className="w-32 animate-bounce" src={imgAcenando} alt="GIF acenando" />
            <form className="form_aluno text-center" onSubmit={(e) => e.preventDefault()}>
              <input
                id="user"
                className="nome bg-gray-300 rounded-md p-2 box-shadow w-64 mb-2 md:mx-4"
                type="email"
                name="username"
                placeholder="E-MAIL"
                autoComplete="on"
              />
              <input
                id="password"
                className="senha bg-gray-300 rounded-md p-2 box-shadow w-64 mb-2 md:mx-4"
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
                <button className="cadastroVisitante bg-gray-300 p-2 hover:bg-gray-200" id="cadastroVisitante">
                  CADASTRO VISITANTE
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="aluno flex flex-col items-center gap-4">
            <p className="text-2xl font-bold mb-4 text-green-500">Login efetuado com sucesso!</p>
          </div>
        )}
      </main>
    </>
  );
}
