import React, { useState, Fragment } from 'react';
import { render } from 'react-dom';
import ScreenCapture from './ScreenCapture';
import './style.css';

const App = () => {
  const [screenCapture, setScreenCapture] = useState('');

  const handleScreenCapture = (screenCapture) => {
    setScreenCapture(screenCapture);
  };

  return (
    <ScreenCapture onEndCapture={handleScreenCapture}>
      {({ onStartCapture }) => (
        <Fragment>
          <p>
            Start editing to see some magic happen :)
          </p>
          <button onClick={onStartCapture}>Capture</button>
          <br/>
          <br/>
          <img src={screenCapture} alt="Screen capture"/>
        </Fragment>
      )}
    </ScreenCapture>
  );
};

render(<App />, document.getElementById('root'));
