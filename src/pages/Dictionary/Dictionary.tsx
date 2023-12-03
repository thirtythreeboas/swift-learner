/** @jsxRuntime classic */
/** @jsx jsx */
import {useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import {getWordBlock} from '@/store/word/ActionCreators';
import {useParams} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import {jsx} from '@emotion/react';
import {dictionaryStyles as s} from './styles';

type Column = {
  id: string;
  label: string;
  visibility: boolean;
};

export const Dictionary = () => {
  const [isRusWordsHidden, setIsRusWordsHidden] = useState<boolean>(false);
  const [isEngWordsHidden, setIsEngWordsHidden] = useState<boolean>(false);
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
      visibility: isEngWordsHidden,
    },
    {
      id: 'rus',
      label: 'Слово',
      visibility: isRusWordsHidden,
    },
  ];

  const hideWords = (columnId: string): void => {
    if (columnId === 'rus') setIsRusWordsHidden(!isRusWordsHidden);
    if (columnId === 'eng') setIsEngWordsHidden(!isEngWordsHidden);
  };

  return (
    <Paper css={s.paper}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} css={s.tableHeadCell}>
                  {column.label}
                  <Button
                    css={s.hideWordsBtn}
                    onClick={() => hideWords(column.id)}
                  >
                    {column.visibility ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {words.wordBlock.map((row) => {
              return (
                <TableRow key={row.id} role='checkbox' tabIndex={-1}>
                  {columns.map((column) => {
                    return (
                      <TableCell
                        key={column.id + row.id}
                        css={[s.tableCell, column.visibility && s.hideWordLine]}
                      >
                        <span>
                          {column.id === 'eng' ? row.eng[0] : row.rus[0]}
                        </span>
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
