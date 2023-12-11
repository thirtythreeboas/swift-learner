import {useEffect, useState, Suspense} from 'react';
import {useAppSelector, useAppDispatch} from '@/hooks/hooks';
import {getVocabBlock} from '@/store/vocabulary-data/action-creators';
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
import LinearProgress from '@mui/material/LinearProgress';
import {useWordBlockName} from '@/hooks/useWordBlockName';
import {dictionaryStyles as s} from './styles';

type Column = {
  id: string;
  label: string;
  visibility: boolean;
};

export const Dictionary = () => {
  const [isRusWordsHidden, setIsRusWordsHidden] = useState<boolean>(false);
  const [isEngWordsHidden, setIsEngWordsHidden] = useState<boolean>(false);
  const {wordBlock} = useAppSelector(({WORDS}) => WORDS);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      if (params.wordBlock) {
        await dispatch(getVocabBlock(params.wordBlock));
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const blockName = useWordBlockName();

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
    <Suspense fallback={<LinearProgress />}>
      {/* <p>{blockName}</p> */}
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
              {wordBlock.map((row) => {
                return (
                  <TableRow key={row.id} role='checkbox' tabIndex={-1}>
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={column.id + row.id}
                          css={[
                            s.tableCell,
                            column.visibility && s.hideWordLine,
                          ]}
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
    </Suspense>
  );
};
