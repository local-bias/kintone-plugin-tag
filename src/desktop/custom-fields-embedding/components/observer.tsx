import { FC, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { getCurrentRecord, setCurrentRecord } from '@konomi-app/kintone-utilities';
import { pluginConditionState, tagDataState } from '../states/plugin';

const Component: FC = () => {
  const condition = useRecoilValue(pluginConditionState);
  const tagData = useRecoilValue(tagDataState);

  useEffect(() => {
    if (!condition) {
      return;
    }

    try {
      const { record } = getCurrentRecord();

      record[condition.configField].value = JSON.stringify(tagData);

      setCurrentRecord({ record });
    } catch (error) {
      console.error(error);
    }
  }, [condition, tagData]);

  return null;
};

export default Component;
