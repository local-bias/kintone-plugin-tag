import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { textFieldsState } from '../../../states/kintone';
import { getConditionPropertyState } from '../../../states/plugin';
import { RecoilFieldSelect } from '@konomi-app/kintone-utilities-react';

const state = getConditionPropertyState('configField');

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
      <RecoilFieldSelect
        label='フィールド名(フィールドコード)'
        state={textFieldsState}
        fieldCode={fields.find((field) => field.code === targetField)?.code ?? ''}
        onChange={(code) => onFieldChange(code)}
      />
    </div>
  );
};

export default memo(Component);
