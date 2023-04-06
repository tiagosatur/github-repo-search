import React from 'react';
import ReactDOM from 'react-dom/client';
import chakraTheme from '@chakra-ui/theme';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import './index.css';

const { Button } = chakraTheme.components;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
