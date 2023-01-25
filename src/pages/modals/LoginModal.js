import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { login } from '../../reducers/userReducer';

const LoginModal = (props) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));

    setUsername('');
    setPassword('');

    props.onHide();
  };

  return (
    <Modal {...props} aria-labelledby={'login-modal'} centered>
      <Modal.Header closeButton>
        <Modal.Title id={'login-modal'}>Login to application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group className={'mb-3'}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type={'text'}
              placeholder={'Enter username'}
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group className={'mb-3'}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={'password'}
              placeholder={'Enter password'}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <Button variant={'primary'} type={'submit'}>
            Login
          </Button>
          <Button
            variant={'outline-secondary'}
            className={'mx-2'}
            onClick={props.onHide}
          >
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
