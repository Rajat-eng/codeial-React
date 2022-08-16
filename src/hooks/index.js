import { useState,useContext, useEffect } from 'react';
import { AuthContext,PostsContext } from '../providers/index';
import {login as userLogin,register,editProfile,fetchUserFriends, getPosts} from '../api'
import { LOCALSTORAGE_TOKEN_KEY,setItemInLocalStorage,removeItemFromLocalStorage,getItemFromLocalStorage } from '../utils';
import jwt from 'jwt-decode';

// usecontext hook
export const useAuth=()=>{
    return useContext(AuthContext);
}


export const useProvideAuth=()=>{ 
    // returns state of a user
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    //perform side effects in your function
    useEffect(()=>{
        const getUser=async ()=>{
        const userToken=getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        if(userToken){
            const user=jwt(userToken);
            const response=await fetchUserFriends();
            let friends=[];
            if(response.success){
                friends=response.data.friends;
            }
            setUser({...user,friends});
        }
        setLoading(false);
        };

        getUser();
    },[])
    

    const login=async (email,password)=>{
        const response = await userLogin(email, password);

        if(response.success){
            // const friends_array=await fetchUserFriends();
            // console.log(friends_array);
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY,
            response.data.token?response.data.token:null);
            return{
                success:true
            }    
        }else{
            return{
                success:false,
                message:response.message
            };
        }
    };


    const logout=()=>{
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    }

    
    const signup = async (name, email, password, confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);
        
        if (response.success) {
          return {
            success: true,
          };
        } else {
          return {
            success: false,
            message: response.message,
          };
        }
    };


    const updateUser=async(userId,name,password,confirmPassword)=>{
        const response = await editProfile(userId, name, password, confirmPassword);
        //console.log('response',response);

        if(response.success){
             setUser(response.data.user);
             setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY,
                response.data.token?response.data.token:null)
            return{
                success:true
            }
        }else{
            return {
                success: false,
                message: response.message,
            };
        }
    }


    const updateUserFriends=(addFriend,friend)=>{
        if(addFriend){
            setUser({...user,friends:[...user.friends,friend]});
            return;
        }
        const newFreinds=user.friends.filter((myfriend)=>{
            return myfriend.to_user._id!==friend.to_user._id
        })
        //console.log(friend)
        
        return setUser({...user,friends:newFreinds});
    }

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

export const usePosts=()=>{
    return useContext(PostsContext)
}

export const useProvidePosts=()=>{
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    const fetchPosts=async ()=>{
        const response=await getPosts();
        if(response.success){
            setPosts(response.data.posts);
        }
        setLoading(false);
    };

    fetchPosts();
  },[])

  const addPostToState=(post)=>{
       const newPosts=[post,...posts];
       setPosts(newPosts);
  }

  const addComment=(comment,postId)=>{
    const newPosts=posts.map((post)=>{
        if(post._id===postId){
            return {...post,comments:[...post.comments,comment]};
        }
        return post;
    })
    setPosts(newPosts);
  }


  return {
    data: posts,
    loading,
    addPostToState,
    addComment,
  };
}

