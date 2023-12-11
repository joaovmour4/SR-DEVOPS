import {useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'



export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const Navigate = useNavigate()
    const [user,setUser] = useState(null)

    useEffect(() => {
        const loadingStoreData = async () => {
            const storeToken = localStorage.getItem('token')
            const storeUser = localStorage.getItem('userName')
    
            if (storeToken) {
                const data = jwtDecode(storeToken)
                if (data) {
                    setUser(JSON.parse(storeUser))
                } else {
                    Navigate('/login')
                }
            }
        }
    
        loadingStoreData();
    }, [])

    const login = async ({nameUser,passowrdUser}) => {
        try {
          const response = await axios.post("http://localhost:3000/login", {userName: nameUser, userPassword: passowrdUser});
    
          const { user, message } = response.data
    
          const { userName , _id, jwtToken, userCargo } = user
    
          setUser(user)
          localStorage.setItem("userName", JSON.stringify(user));
          localStorage.setItem("token", jwtToken.token);
          console.log(user)
    
          setTimeout(() => {
            Navigate("/user");
          })
        } catch (error) {
            console.error("Erro no login:", error);
        }
    };

    const logout = () => {
        localStorage.clear()
        setUser(null)
        return <Navigate to="/login" />
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, signed: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}