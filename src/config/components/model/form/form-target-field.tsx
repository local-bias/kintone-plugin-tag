import { Autocomplete, Skeleton, TextField } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { textFieldsState } from '../../../states/kintone';
import { getConditionPropertyState } from '../../../states/plugin';

const state = getConditionPropertyState('targetField');

const Component: FC = () => {
  const targetField = useRecoilValue(state);
  const fields = useRecoilValue(textFieldsState);

  const onFieldChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(state, value);
      },
    []
  );

  return (
    <div>
      <Autocomplete
        value={fields.find((field) => field.code === targetField) ?? null}
        sx={{ width: '350px' }}
        options={fields}
        isOptionEqualToValue={(option, v) => option.code === v.code}
        getOptionLabel={(option) => `${option.label}(${option.code})`}
        onChange={(_, field) => onFieldChange(field?.code ?? '')}
        renderInput={(params) => (
          <TextField
            {...params}
            label='フィールド名(フィールドコード)'
            variant='outlined'
            color='primary'
          />
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
          <Skeleton variant='rounded' width={360} height={56} />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};

export default memo(Container);
