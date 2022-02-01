import { useContext } from 'react';
import AuthForm from '../components/Auth/AuthForm';
import AuthContext from '../store/auth-context';

const AuthPage = () => {
  const authCtx = useContext(AuthContext);
  console.log("AuthForm");
  console.log(authCtx.isLoggedIn);

  return <AuthForm />;
};

export default AuthPage;
