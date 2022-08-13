import { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import { notifyerror,notifysuccess } from '../utils';
// import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';
import {login} from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  
  //const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      return notifyerror("please enter bothe email and password")
    }

    // const response = await auth.login(email, password);
    const response = await login(email, password);

    if (response.success) {
        notifysuccess('successfully logged in')
    } else {
        notifyerror('unable to preocess request')
    }

    setLoggingIn(false);
  };

  // if (auth.user) {
  //   return <Redirect to="/" />;
  // }

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
