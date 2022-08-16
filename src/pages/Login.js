import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { notifyerror,notifysuccess } from '../utils';
import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';
import { fetchUserFriends } from '../api';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();
  //console.log('auth',auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
   
    if (!email || !password) {
      return notifyerror("please enter both email and password")
    }

    const response = await auth.login(email, password);   
    if (response.success) {
      notifysuccess('successfully logged in'); 
    } else {
      notifyerror('Wrong inputs | Server error')
    }

    setLoggingIn(false);
  };
   
  
  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Log In'}
        </button>
      </div>
    </form>
  );
};

export default Login;
