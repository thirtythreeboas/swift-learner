import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import {StyledEngineProvider} from '@mui/material';
import {Global} from '@emotion/react';
import {globalStyles} from './styles/GlobalStyles';
import {store} from './app/store';
import {router} from './routes';
import './styles/fonts.css';

const container = createRoot(document.getElementById('root') as HTMLElement);

container.render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <Global styles={globalStyles} />
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </Provider>
  </StrictMode>,
);
