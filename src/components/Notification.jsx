const Notification = ({message, type}) => {
  if (!message) {
    return;
  }

  return <div className={`notification ${type}`}>{message}</div>
}

export default Notification;