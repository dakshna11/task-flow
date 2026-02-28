'use client';

import { createContext, useContext } from "react";

type Role = 'admin' | 'user';

const AuthContext = createContext<{role: Role}>({role: 'user'});

export function AuthProvider({ children }: {children: React.ReactNode}){
    const role: Role = 'admin';

    return(
        <AuthContext.Provider value={{role}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);