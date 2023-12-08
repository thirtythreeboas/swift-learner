/** @jsxRuntime classic */
/** @jsx jsx */
import {useAppSelector} from '@/hooks/hooks';
import {UserAnswersList} from '@/types/state';
import {jsx} from '@emotion/react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import {convertTimeToString} from '@/utils/convertTimeToString';
import {highlightAnswer as c, resultStyle as s} from './style';

export const Results = () => {
  const {results, timeSpentOnTest} = useAppSelector(({TEST}) => TEST);

  const numberOfCorrectAnswers = (array: UserAnswersList[]): string => {
    const listOfCorrectAnswers = array.filter((answer) =>
      answer.correctAnswer.includes(answer.userAnswer),
    );
    const correctAnswers = `${listOfCorrectAnswers.length}/${array.length}`;
    return correctAnswers;
  };

  return (
    <TableContainer css={s.container} component={Paper}>
      <Table aria-label='customized table'>
        <TableHead>
          <TableRow>
            <TableCell css={s.headTableCell}>
              <Badge
                css={s.leftBadge}
                color='secondary'
                badgeContent={`Время: ${convertTimeToString(timeSpentOnTest)}`}
              >
                Слово
              </Badge>
            </TableCell>
            <TableCell css={s.headTableCell}>Перевод</TableCell>
            <TableCell css={s.headTableCell}>
              <Badge
                css={s.rightBadge}
                color='secondary'
                badgeContent={numberOfCorrectAnswers(results)}
              >
                Правильный ответ
              </Badge>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row) => (
            <TableRow key={row.word}>
              <TableCell css={[s.bodyTableCell, c(row)]}>{row.word}</TableCell>
              <TableCell css={[s.bodyTableCell, c(row)]}>
                {row.userAnswer}
              </TableCell>
              <TableCell css={s.bodyTableCell}>
                {row.correctAnswer[0]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
