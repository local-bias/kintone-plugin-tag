import { Autocomplete, Skeleton, TextField } from '@mui/material';
import React, { FC, FCX, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { textFieldsState } from '../../../states/kintone';
import { targetFieldState } from '../../../states/plugin';
import styled from '@emotion/styled';

const Component: FCX = ({ className }) => {
  const targetField = useRecoilValue(targetFieldState);
  const fields = useRecoilValue(textFieldsState);

  const onFieldChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(targetFieldState, value);
      },
    []
  );

  return (
    <div className={className}>
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
          <Skeleton variant='rounded' width={360} height={56} />
        </div>
      }
    >
      <StyledComponent />
    </Suspense>
  );
};

export default memo(Container);
