import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
  resetChosenBlocks,
  setCurrentBlockName,
} from '@/store/vocabulary-data/vocabulary-data';
import {restartTest} from '@/store/test-process/test-process';
import {useAppSelector, useAppDispatch} from '@/hooks/hooks';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {RouteNames} from '@/const';
import {homeStyles as s} from './styles';

export const Home = () => {
  const words = useAppSelector(({WORDS}) => WORDS);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restartTest());
    dispatch(resetChosenBlocks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <Button css={s.button} size='small'>
                <Link
                  css={s.link}
                  to={`${RouteNames.TEST}/${item.path}`}
                  onClick={() => dispatch(setCurrentBlockName(item))}
                >
                  Пройти тест
                </Link>
              </Button>
              <Button css={s.button} size='small'>
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
