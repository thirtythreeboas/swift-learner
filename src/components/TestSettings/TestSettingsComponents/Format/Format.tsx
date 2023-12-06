/** @jsxRuntime classic */
/** @jsx jsx */
import React, {FC, useState} from 'react';
import {useAppSelector, useAppDispatch} from '@/hooks/hooks';
import {setFormat} from '@/store/test-process/test-process';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {Languages} from '@/const';
import {Breakpoints} from '@/types/breakpoints';
import {jsx} from '@emotion/react';
import {formatStyles as s} from './style';

type RowBreakpointsProps = {
  breakpoints: Breakpoints;
};

export const Format: FC<RowBreakpointsProps> = ({breakpoints}) => {
  const {firstColumn, secondColumn} = breakpoints;
  const {xs: xs1, md: md1, lg: lg1} = firstColumn;
  const {xs: xs2, md: md2, lg: lg2} = secondColumn;

  const testSelector = useAppSelector(({TEST}) => TEST);
  const dispatch = useAppDispatch();

  const [isLangSwapped, setIsLangSwapped] = useState<boolean>(true);
  const [isRotateOnSwap, setIsRotateOnSwap] = useState<boolean>(false);

  const getLangInfo = (swapper: boolean) => {
    const sourceLang = swapper ? Languages.ENGLISH : Languages.RUSSIAN;
    const targetLang = !swapper ? Languages.ENGLISH : Languages.RUSSIAN;
    const sourceLangCode = swapper ? 'rus' : 'eng';
    const targetLangCode = !swapper ? 'rus' : 'eng';
    return {sourceLang, targetLang, sourceLangCode, targetLangCode};
  };

  const {sourceLang, targetLang, sourceLangCode, targetLangCode} =
    getLangInfo(isLangSwapped);

  const rotate = isRotateOnSwap ? 'rotate(360deg)' : 'rotate(0)';
  const swapLangs = () => {
    setIsRotateOnSwap(!isRotateOnSwap);
    setTimeout(() => setIsRotateOnSwap(!isRotateOnSwap), 1000);
    setIsLangSwapped(!isLangSwapped);
    dispatch(setFormat({sourceLangCode, targetLangCode}));
  };

  return (
    <React.Fragment>
      <Grid item xs={xs1} md={md1} lg={lg1}>
        Формат
      </Grid>
      <Grid item xs={xs2} md={md2} lg={lg2} css={s.secondColumn}>
        <Typography css={s.lang}>{sourceLang}</Typography>
        <Button
          css={s.swapBtn}
          sx={{
            '& .MuiSvgIcon-fontSizeMedium': {
              transition: '1s',
              transform: rotate,
            },
          }}
          onClick={() => swapLangs()}
          disabled={testSelector.isTestStarted}
        >
          <ArrowRightAltIcon />
        </Button>
        <Typography css={s.lang}>{targetLang}</Typography>
      </Grid>
    </React.Fragment>
  );
};
