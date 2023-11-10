/** @jsxRuntime classic */
/** @jsx jsx */
import {FC} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import {jsx, css} from '@emotion/react';

export const Navbar: FC = () => {
  const headerStyle = css`
    display: block;
    width: 100%;
    color: #fff;
    text-align: center;
    font-family: 'Changa', sans-serif;
    font-size: 2em;
    font-weight: 200;
    margin: 0;
    cursor: pointer;
    text-transform: uppercase;
  `;

  return (
    <Box sx={{flexGrow: 1, width: '100%'}}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
            <Link to='/' css={headerStyle}>
              swift-learner
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
