
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { authenticateUser, LOGIN_ENDPOINT } from '../../redux/auth/authSlice';
import { mobile } from '../../responsive';
import { COLORS, images } from "../../constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${images.login_bg}) center;
  background-size: cover;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  ${mobile({ width: '80%' })};
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 90%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  font-weight: 300;
`;

const Button = styled.button`
  padding: 12px 18px;
  width: 50%;
  background-color: ${COLORS.primary};
  cursor: pointer;
  border: none;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  margin: 10px 0 15px 0;
  transition: all 0.3s ease;
  &:hover {
    background-color: #00CCCC;
  }
`;

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const { isAdmin, error, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const payload = { form: credentials, url: LOGIN_ENDPOINT };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authenticateUser(payload));

    if(!isAdmin) {
        toast.error('You are not authorize !', {
          position: toast.POSITION.TOP_RIGHT
        });
    }
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  };

  useEffect(() => {
    if (isAdmin) {
      navigate('/', { replace: true });
    }
  }, [isAdmin])

  return (


    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="email"
            placeholder="email"
            id="email"
            defaultValue=""
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="password"
            id="password"
            defaultValue=""
            onChange={handleChange}
          />
          <span>{error.msg}</span>
          <Button disabled={loading} type="submit">LOG IN</Button>
        </Form>
      </Wrapper>
      <ToastContainer />
    </Container>
  );
}



export default Login;
