/** @jsxRuntime classic */
/** @jsx jsx */
import {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import {getWordBlock} from '@/features/thunks';
import {useParams} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {jsx} from '@emotion/react';
import {dictionaryStyles as s} from './styles';

type Column = {
  id: string;
  label: string;
};

export const Dictionary = () => {
  const words = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.wordBlock) dispatch(getWordBlock(params.wordBlock));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: Column[] = [
    {
      id: 'eng',
      label: 'Перевод',
    },
    {
      id: 'rus',
      label: 'Слово',
    },
  ];

  return (
    <Paper css={s.paper}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell css={s.tableCell}>Слово</TableCell>
              <TableCell css={s.tableCell}>Перевод</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {words.wordBlock.map((row) => {
              return (
                <TableRow key={row.id} role='checkbox' tabIndex={-1}>
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.id + row.id} css={s.tableCell}>
                        {column.id === 'eng' ? row.eng[0] : row.rus[0]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
