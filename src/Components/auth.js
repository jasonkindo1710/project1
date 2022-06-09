import { useState, createContext } from "react";
const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const login = (user) => {
        setUser(user)
    }
    
}