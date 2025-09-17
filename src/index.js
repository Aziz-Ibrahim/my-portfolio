import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme'; // Import your custom theme
import App from './App';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { Notifications } from '@mantine/notifications';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <App />
    </MantineProvider>
  </React.StrictMode>,
);