import React, { FC, FCX, memo, Suspense } from 'react';
import styled from '@emotion/styled';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { Autocomplete, Skeleton, TextField } from '@mui/material';
import { customizeViewsState } from '@/config/states/kintone';
import { wordCloudViewIdState } from '@/config/states/plugin';

const Component: FCX = ({ className }) => {
  const views = useRecoilValue(customizeViewsState);
  const viewId = useRecoilValue(wordCloudViewIdState);

  const onViewIdChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(wordCloudViewIdState, value);
      },
    []
  );

  return (
    <div {...{ className }}>
      <Autocomplete
        value={views.find((view) => view.id === viewId) ?? null}
        sx={{ width: '350px' }}
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

const StyledComponent = styled(Component)`
  & > div {
    width: 250px;
  }
`;

const Container: FC = () => {
  return (
    <Suspense
      fallback={
        <div>
          <Skeleton variant='rounded' width={250} height={56} />
        </div>
      }
    >
      <StyledComponent />
    </Suspense>
  );
};

export default memo(Container);
