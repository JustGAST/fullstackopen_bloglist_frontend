import { useDispatch } from 'react-redux';

import { login } from '../reducers/userReducer';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (credentials) => {
    dispatch(login(credentials));
    navigate('/');
  };

  return <LoginForm handleLogin={handleLogin} />;
};

export default LoginPage;
