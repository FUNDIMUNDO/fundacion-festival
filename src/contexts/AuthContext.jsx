// src/contexts/AuthContext.jsx
import React, { createContext, useEffect, useState } from 'react';
// Usamos onIdTokenChanged para detectar cambios de custom claims
import { onIdTokenChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// Contexto expone user, isAdmin y función logout
export const AuthContext = createContext({ user: null, isAdmin: false, logout: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [isAdmin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (fbUser) => {
      if (fbUser) {
        // Refresca token para cargar siempre los claims actualizados
        const tokenResult = await fbUser.getIdTokenResult(true);
        setAdmin(!!tokenResult.claims.admin);
        setUser(fbUser);
      } else {
        setUser(null);
        setAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null; // o un spinner global

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
