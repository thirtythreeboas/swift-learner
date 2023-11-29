/** @jsxRuntime classic */
/** @jsx jsx */
import {FC} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import {jsx} from '@emotion/react';
import {navbar as s} from './styles';

export const Navbar: FC = () => {
  return (
    <Box css={s.box}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
            <Link to='/' css={s.link}>
              swift-learner
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
