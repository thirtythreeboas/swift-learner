import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import {StyledEngineProvider} from '@mui/material';
import {store} from './app/store';
import './index.css';
import {router} from './routes';

const container = createRoot(document.getElementById('root') as HTMLElement);

container.render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </Provider>
  </StrictMode>,
);
