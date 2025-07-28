import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import app from "../firebaseConfig";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Error Google Sign-In:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (current) => {
      setUser(current);
      setLoading(false);

      if (current) {
        // Escucha en tiempo real el documento del usuario
        const userRef = doc(db, "users", current.uid);
        const unsubUser = onSnapshot(userRef, (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            setIsAdmin(data.role === "admin");
          } else {
            setIsAdmin(false);
          }
        });

        return () => unsubUser();
      } else {
        setIsAdmin(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
