import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import App from './App';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import AnimatedOrbs from './AnimatedOrbs';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <Notifications position="top-right" />
            <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
                <AnimatedOrbs count={120} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <App />
                </div>
            </div>
        </MantineProvider>
    </React.StrictMode>,
);