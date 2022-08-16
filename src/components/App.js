import{BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import {Home,Login,Signup,Settings,UserProfile} from '../pages'
import {Navbar,Loader} from './index';
import {useAuth} from '../hooks'

function PrivateRoute({children}){
  const auth=useAuth();
  if(auth.user){
    return children;
  }
  return <Navigate to="/login"/>
}


function App() {
  const auth=useAuth();

  if(auth.loading){
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
        <Route exact path='/' element={<Home />}>  </Route>
        <Route exact path='/login' element={<Login />}>  </Route>
        <Route exact path='/register' element={<Signup />}>  </Route>
        <Route exact path='/settings' element={<PrivateRoute><Settings /></PrivateRoute>}></Route>
        <Route exact path='/user/:userId' element={<PrivateRoute><UserProfile /></PrivateRoute>}></Route>
        <Route path="*" element={<Page404 />}>  </Route>
      </Routes>  
    </Router>
    
  );
}

export default App;
