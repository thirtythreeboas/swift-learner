import {FC} from 'react';
import {useRouteError, isRouteErrorResponse, Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {RouteNames} from '@/const';
import {errorPageStyle as s} from './style';

export const ErrorPage: FC = () => {
  const error = useRouteError();
  console.error(error);

  const isRouteError = isRouteErrorResponse(error);

  return (
    <Box css={s.container}>
      <Typography variant='h1' gutterBottom>
        Упс!
      </Typography>
      {isRouteError && (
        <Typography variant='h2' gutterBottom>
          {error && error.status}
        </Typography>
      )}
      <Typography variant='h4' gutterBottom>
        Что-то пошло не так...
      </Typography>
      <Typography variant='h5' gutterBottom>
        Похоже, страница, которую вы ищете, не существует
      </Typography>
      <Button css={s.redirect}>
        <Link to={RouteNames.ROOT} css={s.link}>
          Вернуться на домашнюю страницу
        </Link>
      </Button>
    </Box>
  );
};
