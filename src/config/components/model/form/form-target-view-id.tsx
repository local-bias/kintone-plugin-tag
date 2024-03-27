import React, { ChangeEventHandler, FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { MenuItem, Skeleton, TextField } from '@mui/material';
import { allViewsState } from '@/config/states/kintone';
import { getConditionPropertyState } from '@/config/states/plugin';

const state = getConditionPropertyState('targetViewId');

const Component: FC = () => {
  const views = useRecoilValue(allViewsState);
  const viewId = useRecoilValue(state);

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (e) => {
        set(state, e.target.value);
      },
    []
  );

  return (
    <div>
      <TextField select label='一覧の名前' value={viewId} {...{ onChange }} sx={{ width: '250px' }}>
        {Object.entries(views).map(([name, { id }], i) => (
          <MenuItem key={i} value={id}>
            {name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

const Container: FC = () => {
  return (
    <Suspense
      fallback={
        <div>
          <Skeleton variant='rounded' width={250} height={56} />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};

export default memo(Container);
