import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // `user` will hold the authenticated user details (or null if not authenticated)

    // Mock login function
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("authToken", userData.token); // Optionally store the token in localStorage
        localStorage.setItem("data", JSON.stringify(userData)); // Optionally store the token in localStorage
    };

    // Mock logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("authToken"); // Remove token on logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => {
    return useContext(AuthContext);
};
