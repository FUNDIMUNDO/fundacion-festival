/* ESTE CODIGO HACE QUE SOLO SE PERMITA ACCESO SI isAdmin = TRUE */

// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet }  from 'react-router-dom';
import { AuthContext }       from '../contexts/AuthContext';

export default function ProtectedRoute() {
  const { user, isAdmin } = useContext(AuthContext);
  if (!user)    return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/"      replace />;
  return <Outlet />;
}
