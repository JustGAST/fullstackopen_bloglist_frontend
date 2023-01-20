import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef(({ showButtonText, children }, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisible = () => setVisible(!visible);

  useImperativeHandle(refs, () => ({
    toggleVisible,
  }));

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
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  showButtonText: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Togglable;
