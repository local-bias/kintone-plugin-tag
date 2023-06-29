import { FormControlLabel, Skeleton, Switch } from '@mui/material';
import React, { FC, FCX, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { hideConfigFieldState } from '../../../states/plugin';
import styled from '@emotion/styled';

const Component: FCX = ({ className }) => {
  const hideConfigField = useRecoilValue(hideConfigFieldState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (value: boolean) => {
        set(hideConfigFieldState, value);
      },
    []
  );

  return (
    <div className={className}>
      <FormControlLabel
        control={<Switch color='primary' checked={hideConfigField} />}
        onChange={(_, checked) => onChange(checked)}
        label='タグの設定情報フィールドを非表示にする'
      />
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const Container: FC = () => {
  return (
    <Suspense
      fallback={
        <div>
          <Skeleton width={360} height={56} />
        </div>
      }
    >
      <StyledComponent />
    </Suspense>
  );
};

export default memo(Container);
