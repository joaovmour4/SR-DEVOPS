import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [loginEfetuado, setLoginEfetuado] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const realizarLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        userName: username,
        userPassword: password
      });
  
      localStorage.setItem("userName", response.data.userName);
      localStorage.setItem("token", response.data.jwtToken.token);
  
      setTimeout(() => {
        navigate("/user", {
          state: {
            userName: response.data.userName,
            userRole: response.data.jwtToken.userCargo
          }
        });
      }, 1000);
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };
  

  const irCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <>
      <main className="container flex flex-col justify-center items-center flex-grow min-h-screen w-full mx-auto">
        {!loginEfetuado ? (
          <div className="aluno flex flex-col items-center gap-4">
            <form className="form_aluno text-center" onSubmit={(e) => e.preventDefault()}>
              <input
                id="user"
                className="nome bg-gray-300 rounded-md p-2 box-shadow w-64 mb-2 md:mx-4 block"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="E-MAIL"
                autoComplete="on"
              />
              <input
                id="password"
                className="senha bg-gray-300 rounded-md p-2 box-shadow w-64 mb-2 md:mx-4 block"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
};

export default Login;
