import React, { ChangeEventHandler, FC, FCX, memo, Suspense } from 'react';
import styled from '@emotion/styled';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { MenuItem, Skeleton, TextField } from '@mui/material';
import { allViewsState } from '@/config/states/kintone';
import { wordCloudViewIdState } from '@/config/states/plugin';

const Component: FCX = ({ className }) => {
  const views = useRecoilValue(allViewsState);
  const viewId = useRecoilValue(wordCloudViewIdState);

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (e) => {
        set(wordCloudViewIdState, e.target.value);
      },
    []
  );

  return (
    <div {...{ className }}>
      <TextField select label='一覧の名前' value={viewId} {...{ onChange }}>
        {Object.entries(views).map(([name, { id }], i) => (
          <MenuItem key={i} value={id}>
            {name}
          </MenuItem>
        ))}
      </TextField>
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
