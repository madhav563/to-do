import { createContext, useContext, useState } from "react";
import {jwtDecode} from "jwt-decode";


export const AuthContext = createContext(); //it will hold authentication state and methods(user,login,logout)


export const AuthProvider = ({children}) => {

    const[user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        return token ? jwtDecode(token):"null";
    });

    const login = ((token) => {
        localStorage.setItem("token", token);
        setUser(jwtDecode(token));
    });

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);