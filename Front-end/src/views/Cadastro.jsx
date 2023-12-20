import React, { useState } from "react";
import axios from 'axios';
import imgAluno from "../img/aluno.png";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const cadastrarUsuario = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user", {
        userName: nome,
        userEmail: email,
        userPassword: senha
      });

      console.log("Resposta do cadastro:", response.data);
      const { userCargo, userName } = response.data.createdUser

      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("userCargo", userCargo);

      setTimeout(() => {
        navigate("/user");
      },1000)


    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <img className="w-20" src={imgAluno} alt="img representando os alunos" />
          <form onSubmit={(e) => { e.preventDefault(); cadastrarUsuario(); }}>
            <div className="flex flex-col items-center gap-2">
              <input
                className="bg-gray-300 rounded-md p-2 box-shadow"
                type="text"
                placeholder="NOME"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                className="bg-gray-300 rounded-md p-2 box-shadow"
                type="email"
                placeholder="E-MAIL"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="bg-gray-300 rounded-md p-2 box-shadow"
                type="password"
                placeholder="SENHA"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <button
              className="bg-green-500 text-white max-w-28 p-2 hover:bg-green-600 rounded-md mt-4 mx-auto"
              type="submit"
            >
              CADASTRAR
            </button>
          </form>
        </div>
      </main>
    </>
  );
}