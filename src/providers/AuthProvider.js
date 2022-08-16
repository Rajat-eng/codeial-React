import { createContext } from 'react';
import {useProvideAuth} from '../hooks';

// AuthContext will be available to all child components otherwise we have to pass props at every component
const initialState={
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
  signup: () => {},
  updateUser: () => {},
  updateUserFriends: () => {},
}

export const AuthContext=createContext(initialState);

export const AuthProvider=({children})=>{
    const auth=useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}