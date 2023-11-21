import {useAppSelector} from '@/app/hooks';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
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
    <TableContainer sx={{overflowX: 'initial'}} component={Paper}>
      <Table sx={{minWidth: 600}} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <Badge
              sx={{
                '& .MuiBadge-badge': {
                  top: '-10px',
                  right: '-10px',
                  fontSize: '20px',
                  height: '30px',
                  width: '140px',
                },
              }}
              color='secondary'
              badgeContent={`Время: ${results.time}`}
            >
              <TableCell align='right'>Слово</TableCell>
            </Badge>
            <TableCell align='left'>Перевод</TableCell>
            <Badge
              sx={{
                '& .MuiBadge-badge': {
                  top: '-10px',
                  fontSize: '20px',
                  height: '30px',
                },
              }}
              color='secondary'
              badgeContent={numberOfCorrectAnswers(results.answers)}
            >
              <TableCell align='left'>Правильный ответ</TableCell>
            </Badge>
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
  );
};
