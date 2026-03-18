import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import WalletContextProvider from './components/WalletContextProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletContextProvider>
      <App />
    </WalletContextProvider>
  </StrictMode>,
);
