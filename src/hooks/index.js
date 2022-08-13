import { useState } from 'react';

export const useProvideAuth=()=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const login=(email,password)=>{}
    const logout=()=>{}
    const signup=()=>{}
    const updateUser=()=>{}
    const updateUserFriends=()=>{}
    return{
        user,
        login,
        logout,
        loading,
        signup,
        updateUser,
        updateUserFriends,
    }
}