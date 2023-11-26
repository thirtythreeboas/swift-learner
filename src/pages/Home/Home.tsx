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
import {homeStyles} from './styles';

export const Home = () => {
  const words = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restartTest());
    dispatch(resetChosenBlocks());
  }, []);

  return (
    <Container css={homeStyles.container}>
      <Typography css={homeStyles.header} variant='h5' gutterBottom>
        Выберите блок
      </Typography>
      <Box css={homeStyles.contentWrapper}>
        {words.blockList.map((item) => (
          <Card css={homeStyles.card} key={item.id}>
            <CardMedia
              css={homeStyles.cardMedia}
              image={item.img}
              title={item.name}
            />
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
                  css={homeStyles.link}
                  to={`${RouteNames.TEST}/${item.path}`}
                  onClick={() => dispatch(chooseWordBlock(item))}
                >
                  Take the test
                </Link>
              </Button>
              <Button size='small'>
                <Link
                  css={homeStyles.link}
                  to={`${RouteNames.WORDS}/${item.path}`}
                >
                  Check words
                </Link>
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};
