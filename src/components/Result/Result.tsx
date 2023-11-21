import {useAppSelector} from '@/app/hooks';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {highlightAnswer} from '@/utils/result';
import {UserAnswersList} from '@/types/state';

export const Results = () => {
  const {results} = useAppSelector((state) => state.test);

  const numberOfCorrectAnswers = (array: UserAnswersList[]): string => {
    const listOfCorrectAnswers = array.filter((e) =>
      e.correctAnswer.includes(e.userAnswer),
    );
    const correctAnswers = `${listOfCorrectAnswers.length}/${array.length}`;
    return correctAnswers;
  };

  return (
    <>
      <List>
        <ListItem>
          <ListItemText
            sx={{cursor: 'auto'}}
            primary={`Время: ${results.time}`}
          />
        </ListItem>
      </List>
      <Badge
        sx={{'& .MuiBadge-badge': {fontSize: '20px', height: '30px'}}}
        color='secondary'
        badgeContent={numberOfCorrectAnswers(results.answers)}
      >
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 600}} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Слово</TableCell>
                <TableCell align='left'>Перевод</TableCell>
                <TableCell align='left'>Правильный ответ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.answers.map((row) => (
                <TableRow key={row.word}>
                  <TableCell
                    sx={{
                      ...highlightAnswer(row),
                      width: '200px',
                      border: '2px solid #fff',
                    }}
                    align='left'
                  >
                    {row.word}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...highlightAnswer(row),
                      width: '200px',
                      border: '2px solid #fff',
                    }}
                    align='left'
                  >
                    {row.userAnswer}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: '#eaffd5',
                      width: '200px',
                      border: '2px solid #fff',
                    }}
                    align='left'
                  >
                    {row.correctAnswer[0]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Badge>
    </>
  );
};
