import {BlockListElement} from '@/types/state';
import {AppDispatch} from '@/hooks/hooks';
import {setCurrentBlockName} from '@/store/vocabulary-data/vocabulary-data';

type AssignBlockNameParams = {
  blockList: BlockListElement[];
  wordBlock: string;
  dispatch: AppDispatch;
};

export const assignBlockName = ({
  blockList,
  wordBlock,
  dispatch,
}: AssignBlockNameParams): void => {
  const block: BlockListElement | undefined = blockList.find(
    (elem) => elem.path === wordBlock,
  );
  if (block) {
    dispatch(setCurrentBlockName(block));
  }
};
