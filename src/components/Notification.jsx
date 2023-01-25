import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { emptyNotification } from '../reducers/notificationReducer';

const Notification = ({ message, type }) => {
  if (!message) {
    return;
  }

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(emptyNotification());
  };

  return (
    <Alert variant={type} onClose={onClose} dismissible>
      {message}
    </Alert>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Notification;
