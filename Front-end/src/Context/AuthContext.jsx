import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const loadingStoreData = async () => {
        const storeToken = sessionStorage.getItem('token');
        if (storeToken) {
          const data = jwtDecode(storeToken);
          if (data) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${storeToken}`;
            setUser(await fetchUserDataFromServer(storeToken));
          } else {
            sessionStorage.removeItem('token');
            navigate('/login');
          }
        }
      };
  
      loadingStoreData();
    }, [navigate]);
  
    const fetchUserDataFromServer = async (token) => {
      try {
        const response = await axios.get('http://localhost:3000/user/self', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.message;
      } catch (error) {
        console.error('Erro ao obter dados do usuário do servidor:', error);
        return null;
      }
    };

    const login = async ({ nameUser, passowrdUser }) => {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          userName: nameUser,
          userPassword: passowrdUser,
        });
    
        const { user, message } = response.data;
    
        const { userName, _id, jwtToken, userCargo, userSubsidio, userEmail } = user;
    
        setUser(user);
        sessionStorage.setItem('token', jwtToken.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken.token}`;
    
        console.log(user);
    
        setTimeout(() => {
          navigate('/user');
        });
      } catch (error) {
        console.error('Erro no login:', error);
      }
    };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    navigate('/login');
    // const response = axios.get('http://localhost:3000/logout', {
    //   headers: {
    //     Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    //   },
    // })

    // if (response.status === 200) {
    //   navigate('/login');
    //   console.log('Logout realizado com sucesso!');
    // }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signed: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
