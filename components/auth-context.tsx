'use client';

import { getUserLS, saveUserLS } from '@/lib/helpers';
import { UserData } from '@/lib/types';
import React, { useEffect, useState, createContext, useContext } from 'react';

type AuthContextType = {
  userData: UserData | null;
  setUser: (userData: UserData) => void;
};

const initAuthContext: AuthContextType = {
  userData: null,
  setUser: () => {},
};

const initialUserData = getUserLS() || null;

export const AuthContext = createContext<AuthContextType>(initAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(initialUserData);

  const setUser = (userData: UserData) => {
    setUserData(() => userData);
    saveUserLS(userData);
  };

  useEffect(() => {
    const verify = async () => {
      try {
        const authResult = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (authResult.status === 200) {
          const res = await authResult.json();
          // setUser(res.user);
        } else {
          setUserData({
            id: '0',
            username: 'Guest',
            email: 'example@gmail.com',
            img: '',
            role: 'Guest',
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    verify();
    console.log('AuthContext: ', userData);
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
