import { FormControlLabel, Switch } from '@mui/material';
import { produce } from 'immer';
import React, { FC } from 'react';
import { useRecoilCallback } from 'recoil';
import { storageState } from '../../../states/plugin';

type Props = { condition: kintone.plugin.Condition; index: number };

const Component: FC<Props> = ({ condition, index }) => {
  const onSwitchChange = useRecoilCallback(
    ({ set }) =>
      (checked: boolean, option: keyof kintone.plugin.Condition) => {
        set(storageState, (_, _storage = _!) =>
          produce(_storage, (draft) => {
            draft.conditions[index][option] = checked as never;
          })
        );
      },
    [index]
  );

  const setHideConfigField = (checked: boolean) => onSwitchChange(checked, 'hideConfigField');

  return (
    <>
      <FormControlLabel
        control={<Switch color='primary' checked={condition.hideConfigField} />}
        onChange={(_, checked) => setHideConfigField(checked)}
        label='構造化データを保存するフィールドを非表示'
      />
    </>
  );
};

export default Component;
