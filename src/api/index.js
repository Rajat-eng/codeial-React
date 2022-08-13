import { API_URLS,LOCALSTORAGE_TOKEN_KEY,getFormBody } from "../utils";

const customFetch=async (url,{body,...customConfig})=>{
    const token=window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    const headers={
        'Content-Type':'application/x-www-form-urlencoded',   
    }
    if(token){
        headers.Authorization=`Bearer ${token}`
    }

    const config={
        ...customConfig, // method like post,get
        headers:{
            ...headers,
            ...customConfig.headers
        }
    }

    if(body){
        config.body=getFormBody(body);
    }

    try{
        const response=await fetch(url,config);
        const data=await response.json();
        if(data.success){
            return{
                data:data.data,
                success:true
            };
        }

        throw new Error(data.message); 

    }catch(err){
        console.log('err',err);
        return{
            message:err.message,
            success:false
        }
    }
};



export const getPosts=(page=1,limit=5)=>{
    return customFetch(API_URLS.posts(page,limit),{
        method:'GET',    
    });
}

export const login=(email,password)=>{
    return customFetch(API_URLS.login(),{
        method:'post',
        body:{email,password}
    })
}

