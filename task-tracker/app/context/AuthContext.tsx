'use client';

import { SessionProvider } from "next-auth/react";
import { createContext, useContext } from "react";

type Role = 'admin' | 'user';

const AuthContext = createContext<{role: Role}>({role: 'user'});

export function AuthProvider({ children }: {children: React.ReactNode}){
    const role: Role = 'admin';

    return(
        <SessionProvider>
            <AuthContext.Provider value={{role}}>
                {children}
            </AuthContext.Provider>
        </SessionProvider>
    );
}

export const useAuth = () => useContext(AuthContext);