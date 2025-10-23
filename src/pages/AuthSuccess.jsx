// src/pages/AuthSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const userJson = searchParams.get('user');

    if (token && userJson) {
      try {
        const user = JSON.parse(decodeURIComponent(userJson));
        const authData = { token, user };
        
        // Save to context and localStorage
        login(authData);
        
        // Redirect to home page
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Error processing Google auth:', error);
        navigate('/signin', { 
          replace: true, 
          state: { error: 'Authentication failed' } 
        });
      }
    } else {
      navigate('/signin', { 
        replace: true, 
        state: { error: 'Missing authentication data' } 
      });
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}