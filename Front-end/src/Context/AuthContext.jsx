import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      const loadingStoreData = async () => {
        const storeToken = localStorage.getItem('token');
        const storeUser = localStorage.getItem('userName');
  
        if (storeToken) {
          const data = jwtDecode(storeToken);
          if (data) {
            setUser({ ...JSON.parse(storeUser), ...data });
            setUserData(await fetchUserDataFromServer(storeToken)); 
          } else {
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
        localStorage.setItem('userName', JSON.stringify(user));
        localStorage.setItem('token', jwtToken.token);
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
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signed: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
