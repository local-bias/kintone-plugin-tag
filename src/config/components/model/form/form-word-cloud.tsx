import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { Autocomplete, Skeleton, TextField } from '@mui/material';
import { customizeViewsState } from '@/config/states/kintone';
import { getConditionPropertyState } from '@/config/states/plugin';

const state = getConditionPropertyState('wordCloudViewId');

const Component: FC = () => {
  const views = useRecoilValue(customizeViewsState);
  const viewId = useRecoilValue(state);

  const onViewIdChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(state, value);
      },
    []
  );

  return (
    <div>
      <Autocomplete
        value={views.find((view) => view.id === viewId) ?? null}
        sx={{ width: '250px' }}
        options={views}
        isOptionEqualToValue={(view, v) => view.id === v.id}
        getOptionLabel={(view) => `${view.name}`}
        onChange={(_, view) => onViewIdChange(view?.id ?? '')}
        renderInput={(params) => (
          <TextField {...params} label='一覧の名前' variant='outlined' color='primary' />
        )}
      />
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
