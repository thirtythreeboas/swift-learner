/** @jsxRuntime classic */
/** @jsx jsx */
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {resetChosenBlocks, chooseWordBlock} from '@/features/word/wordSlice';
import {restartTest} from '@/features/test/testSlice';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {jsx} from '@emotion/react';
import {RouteNames} from '@/types/const';
import {homeStyles as s} from './styles';

export const Home = () => {
  const words = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restartTest());
    dispatch(resetChosenBlocks());
  }, []);

  return (
    <Container css={s.container}>
      <Typography css={s.header} variant='h5' gutterBottom>
        Выберите блок
      </Typography>
      <Box css={s.contentWrapper}>
        {words.blockList.map((item) => (
          <Card css={s.card} key={item.id}>
            <CardMedia css={s.cardMedia} image={item.img} title={item.name} />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {item.name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {item.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>
                <Link
                  css={s.link}
                  to={`${RouteNames.TEST}/${item.path}`}
                  onClick={() => dispatch(chooseWordBlock(item))}
                >
                  Пройти тест
                </Link>
              </Button>
              <Button size='small'>
                <Link css={s.link} to={`${RouteNames.WORDS}/${item.path}`}>
                  Посмотреть слова
                </Link>
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};
