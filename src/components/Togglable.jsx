import {forwardRef, useImperativeHandle, useState} from 'react';

const Togglable = forwardRef(({showButtonText, children}, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = {display: visible ? 'none' : ''};
  const showWhenVisible = {display: visible ? '' : 'none'};

  const toggleVisible = () => setVisible(!visible);

  useImperativeHandle(refs, () => ({
    toggleVisible
  }))

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{showButtonText}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisible}>Cancel</button>
      </div>
    </div>
  )
});

export default Togglable;