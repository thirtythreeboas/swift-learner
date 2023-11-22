import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {resetChosenBlocks} from '@/features/word/wordSlice';
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
import {RouteNames} from '@/types/const';
import styles from './Home.module.scss';

export const Home = () => {
  const words = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restartTest());
    dispatch(resetChosenBlocks());
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 'auto',
        padding: '10px',
      }}
    >
      <div className={styles.homePage}>
        <Typography sx={{margin: '0 auto'}} variant='h5' gutterBottom>
          Выберите блок
        </Typography>
        <Link className={styles.linkBtn} to={RouteNames.WORDS}>
          Посмотреть слова
        </Link>
        <Link className={styles.linkBtn} to={RouteNames.TEST}>
          Начать тест
        </Link>
      </div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '35px 0',
          width: '100%',
        }}
      >
        {words.blockList.map((item) => (
          <Card sx={{maxWidth: 345}} key={item.id}>
            <CardMedia sx={{height: 140}} image={item.img} title={item.name} />
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
                <Link to='/test' state={{chosenBlock: item.path}}>
                  Take the test
                </Link>
              </Button>
              <Button size='small'>
                <Link to='/words' state={{chosenBlock: item.path}}>
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
