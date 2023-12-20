import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from '../Context/AuthContext';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const { login, signed } = useContext(AuthContext)
  const [loginEfetuado, setLoginEfetuado] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e){
    if (username === '' || password === '') return alert('Preencha todos os campos')
    e.preventDefault()
    setUsername(username)
    setPassword(password)
    try {
      login({nameUser: username, passowrdUser: password})
    } catch ( err ) {
      console.error('Erro no login:', err)
    }
  }

  useEffect(() => {
    if (signed) {
      setLoginEfetuado(true)
    }

  },[signed])

  return (
    <>
       <main className="container flex flex-col justify-center items-center flex-grow min-h-screen w-full mx-auto">
        {!signed ? (
          <div className="aluno flex flex-col items-center gap-4">
            <form className="form_aluno text-center" onSubmit={handleSubmit}>
              <input
                id="user"
                className="nome bg-gray-300 rounded-md p-2 box-shadow w-64 mb-2 md:mx-4 block"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="USUÁRIO"
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
                  onClick={handleSubmit}
                  className="entrar_aluno bg-green-500 text-white p-2 hover:bg-green-600"
                  id="entrarAluno"
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                  ENTRAR
                </button>
                <Link to={'/cadastro'} className="cadastroVisitante bg-gray-300 p-2 hover:bg-gray-200" id="cadastroVisitante">
                <FontAwesomeIcon icon={faUser} className="icon mr-2"/>
                  CADASTRO VISITANTE
                </Link>
              </div>
              </form>
          </div>
        ) : <div>Você já está logado <Link to={"/user"}>Ir para User</Link></div>}
      </main>
    </>
  );
};

export default Login;