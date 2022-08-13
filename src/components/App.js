import {useEffect, useState} from 'react';
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {getPosts} from '../api';
import {Home,Login} from '../pages'
import {Navbar,Loader} from './index';


function App() {
  const[posts,setPosts]=useState([]);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
      const fetchPosts=async()=>{ // can use async in useeffect
        const response=await getPosts();
        if(response.success){
          setPosts(response.data.posts); // send posts to Home Page
        }
         setLoading(false); // loading ball on page
      }
    fetchPosts();
  },[])


  if(loading){
    return(
      <Loader />
    )
  }

  const Page404 = () => {
    console.log('No routes');
    return <h1>404</h1>;
  };

  return (
  
    <Router>
    <Navbar />
      <Routes>
        <Route exact path='/' element={<Home posts={posts} />}>  </Route>
        <Route exact path='/login' element={<Login />}>  </Route>
        <Route path="*" element={<Page404 />}>  </Route>

      </Routes>  
    </Router>
    
  
    
  );
}

export default App;
