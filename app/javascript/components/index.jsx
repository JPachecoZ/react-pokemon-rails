import React from 'react';
import ReactDOM from 'react-dom/client';

import reset from './styles/reset';
import { Global } from '@emotion/react';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Global styles={reset}/>
    <div>Hello, World!</div>
  </React.StrictMode>
);
