import React, { FC, FCX, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { produce } from 'immer';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { storageState, tabIndexState } from '../../../states/plugin';
type Props = Readonly<{ onClick: () => void }>;

const Component: FCX<Props> = ({ className, onClick }) => (
  <Button
    variant='outlined'
    color='error'
    onClick={onClick}
    endIcon={<DeleteIcon fontSize='small' />}
  >
    この設定を削除する
  </Button>
);

const Container: FC = () => {
  const index = useRecoilValue(tabIndexState);

  const onClick = useRecoilCallback(
    ({ set }) =>
      async () => {
        set(storageState, (_, _storage = _!) =>
          produce(_storage, (draft) => {
            draft.conditions.splice(index, 1);
          })
        );
        set(tabIndexState, (i) => (i === 0 ? i : i - 1));
      },
    [index]
  );

  return <Component {...{ onClick }} />;
};

export default memo(Container);
