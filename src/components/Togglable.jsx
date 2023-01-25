import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

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
        <Button variant={'primary'} onClick={toggleVisible}>
          {showButtonText}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button variant={'outline-secondary'} onClick={toggleVisible}>
          Cancel
        </Button>
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
