import {useEffect} from 'react';
import {getVocabCategories} from '@/store/vocabulary-data/action-creators';
import {setCurrentBlockName} from '@/store/vocabulary-data/vocabulary-data';
import {BlockListElement} from '@/types/state';
import {useParams} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from './hooks';

export const useWordBlockName = (): string => {
  const {blockList, chosenBlock} = useAppSelector(({WORDS}) => WORDS);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getVocabCategories());
  });
  useEffect(() => {
    console.log(chosenBlock, blockList);
    if (chosenBlock) {
      console.log('first');
      return;
    }
    const block: BlockListElement | undefined = blockList.find(
      (elem) => elem.path === params.wordBlock,
    );
    console.log(block);
    if (block) {
      console.log('setting current block');
      setCurrentBlockName(block);
    }
  }, [blockList]);

  if (chosenBlock) return chosenBlock.name;
  return 'Не удалось найди нужный блок слов';
};
