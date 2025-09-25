import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

// ==================== AUTH CONTEXT ====================
const AuthContext = createContext();

const DUMMY_USERS = [
  {
    id: '1',
    email: 'user@example.com',
    phone: '+1234567890',
    password: 'password123',
    name: 'John Doe',
    avatar: null,
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: new Date().toISOString()
  },
  {
    id: '2', 
    email: 'demo@placemate.com',
    phone: '+9876543210',
    password: 'demo123',
    name: 'Demo User',
    avatar: null,
    createdAt: '2024-02-01T14:20:00Z',
    lastLogin: new Date().toISOString()
  }
];

const AuthActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOGOUT: 'LOGOUT'
};

const initialAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null
      };
    case AuthActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case AuthActionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    case AuthActionTypes.LOGOUT:
      return {
        ...initialAuthState,
        isLoading: false
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Check stored auth on mount
  useEffect(() => {
    const checkStoredAuth = () => {
      try {
        const storedAuth = localStorage.getItem('placemate_auth');
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          if (authData?.user && authData?.token) {
            dispatch({ type: AuthActionTypes.SET_USER, payload: authData.user });
            return;
          }
        }
      } catch (error) {
        console.error('Error checking stored auth:', error);
      }
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: false });
    };

    const timer = setTimeout(checkStoredAuth, 800);
    return () => clearTimeout(timer);
  }, []);

  const simulateApiCall = (ms = 1000) => 
    new Promise(resolve => setTimeout(resolve, ms));

  const login = async (credentials) => {
    dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });
    dispatch({ type: AuthActionTypes.CLEAR_ERROR });

    try {
      await simulateApiCall(800);

      const { identifier, password, loginType } = credentials;
      
      const user = DUMMY_USERS.find(u => {
        if (loginType === 'email') {
          return u.email.toLowerCase() === identifier.toLowerCase();
        } else {
          return u.phone === identifier;
        }
      });

      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }

      const updatedUser = { ...user, lastLogin: new Date().toISOString() };
      const authData = {
        user: updatedUser,
        token: `dummy_token_${user.id}_${Date.now()}`
      };

      localStorage.setItem('placemate_auth', JSON.stringify(authData));
      dispatch({ type: AuthActionTypes.SET_USER, payload: updatedUser });

      return { success: true, user: updatedUser };
    } catch (error) {
      dispatch({ type: AuthActionTypes.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });
    dispatch({ type: AuthActionTypes.CLEAR_ERROR });

    try {
      await simulateApiCall(1200);

      const { name, email, phone, password } = userData;

      const existingUser = DUMMY_USERS.find(u => 
        u.email.toLowerCase() === email.toLowerCase() || u.phone === phone
      );

      if (existingUser) {
        throw new Error('User already exists with this email or phone number');
      }

      const newUser = {
        id: `${Date.now()}`,
        email: email.toLowerCase(),
        phone,
        password,
        name,
        avatar: null,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      DUMMY_USERS.push(newUser);

      const authData = {
        user: newUser,
        token: `dummy_token_${newUser.id}_${Date.now()}`
      };

      localStorage.setItem('placemate_auth', JSON.stringify(authData));
      dispatch({ type: AuthActionTypes.SET_USER, payload: newUser });

      return { success: true, user: newUser };
    } catch (error) {
      dispatch({ type: AuthActionTypes.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });

    try {
      await simulateApiCall(300);
      
      localStorage.removeItem('placemate_auth');
      dispatch({ type: AuthActionTypes.LOGOUT });
      console.log("logg")
      return { success: true };
    } catch (error) {
      dispatch({ type: AuthActionTypes.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const clearError = () => {
    dispatch({ type: AuthActionTypes.CLEAR_ERROR });
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
    clearError,
    isLoggedIn: state.isAuthenticated,
    userRole: state.user?.role || 'user'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export default AuthProvider;