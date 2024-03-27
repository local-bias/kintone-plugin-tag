import { FormControlLabel, Skeleton, Switch } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { getConditionPropertyState } from '../../../states/plugin';

const state = getConditionPropertyState('hideConfigField');

const Component: FC = () => {
  const hideConfigField = useRecoilValue(state);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (value: boolean) => {
        set(state, value);
      },
    []
  );

  return (
    <div>
      <FormControlLabel
        control={<Switch color='primary' checked={hideConfigField} />}
        onChange={(_, checked) => onChange(checked)}
        label='タグの設定情報フィールドを非表示にする'
      />
    </div>
  );
};

const Container: FC = () => {
  return (
    <Suspense
      fallback={
        <div>
          <Skeleton width={360} height={56} />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};

export default memo(Container);
