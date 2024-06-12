// authContext.js

import React, { createContext, useContext, useState } from 'react';


// Create the AuthContext
const AuthContext = createContext<{ user: any | null, login: (credentials: any) => Promise<void>, logout: () => Promise<void> } | null>(null);


// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);

// write authentication functions like login, logout, etc.
    const login = async (credentials: any) => {
        const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json'
        }
        });
        if (response.ok) {
        const user = await response.json();
        setUser(user);
        } else {
        throw new Error('Authentication failed');
        }
    };

    const logout = async () => {
        // write logout logic here
        // clear user data from local storage
        localStorage.removeItem('user');
        // clear user data from local storage
        setUser(null);
    };

    return (
        <AuthContext.Provider value={user ? { user, login, logout } : null}>
        {children}
        </AuthContext.Provider>
    );
};

// useAuth hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);


