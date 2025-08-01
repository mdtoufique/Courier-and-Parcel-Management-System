import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Optional: check expiration
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          const savedUser = JSON.parse(localStorage.getItem("user"));
          setUser(savedUser);
          
        }
      } catch (err) {
        console.log(err);
        logout();
      }
      
    }
    
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout ,loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
