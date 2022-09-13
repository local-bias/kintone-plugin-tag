import React, { FCX, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { Autocomplete, Skeleton, TextField } from '@mui/material';
import produce from 'immer';

import { kx } from '@type/kintone.api';
import { textFieldsState } from '../../../states/kintone';
import { storageState } from '../../../states/plugin';

import OptionsForm from './form-options';
import ViewIdForm from './form-view-id';

type ContainerProps = { condition: kintone.plugin.Condition; index: number };

const Component: FCX<ContainerProps> = ({ className, condition, index }) => {
  const appFields = useRecoilValue(textFieldsState);

  const onTargetFieldChange = useRecoilCallback(
    ({ set }) =>
      (field: kx.FieldProperty | null) => {
        if (!field) {
          return;
        }
        set(storageState, (_, _storage = _!) =>
          produce(_storage, (draft) => {
            draft.conditions[index].targetField = field.code;
          })
        );
      },
    []
  );

  const onConfigFieldChange = useRecoilCallback(
    ({ set }) =>
      (field: kx.FieldProperty | null) => {
        if (!field) {
          return;
        }
        set(storageState, (_, _storage = _!) =>
          produce(_storage, (draft) => {
            draft.conditions[index].configField = field.code;
          })
        );
      },
    []
  );

  return (
    <div {...{ className }}>
      <div>
        <h3>対象フィールド *</h3>
        <Autocomplete
          value={appFields.find((field) => field.code === condition.targetField)}
          sx={{ width: '350px' }}
          options={appFields}
          onChange={(_, option) => onTargetFieldChange(option)}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label='対象フィールド' variant='outlined' color='primary' />
          )}
        />
      </div>
      <div>
        <h3>構造化データ保存フィールド *</h3>
        <Autocomplete
          value={appFields.find((field) => field.code === condition.configField)}
          sx={{ width: '350px' }}
          options={appFields}
          onChange={(_, option) => onConfigFieldChange(option)}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label='対象フィールド' variant='outlined' color='primary' />
          )}
        />
        <small>タグの区切りを厳格に管理するために必要となります</small>
      </div>
      <div>
        <h3>タグクリック時に表示する一覧</h3>
        <Suspense fallback={<Skeleton height={24} />}>
          <ViewIdForm conditionIndex={index} />
        </Suspense>
        <small>対象の一覧が選択肢に存在しない場合は、一度アプリを更新してください。</small>
      </div>
      <OptionsForm condition={condition} index={index} />
    </div>
  );
};

const StyledComponent = styled(Component)`
  padding: 0 16px;
  > div {
    padding: 8px 8px 8px 16px;
    border-left: 2px solid #0002;
    margin-bottom: 1rem;
    > h3 {
      font-weight: 500;
      margin-bottom: 16px;
    }
  }
  small {
    opacity: 0.7;
    color: #f70;
  }
`;

export default StyledComponent;
