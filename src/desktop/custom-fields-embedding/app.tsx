import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';

import Observer from './components/observer';
import Layout from './components/layout';
import Input from './components/input';
import Tag from './components/tag';
import { pluginConditionState, tagDataState } from './states/plugin';

type Props = {
  condition: kintone.plugin.Condition;
  initialValue: kintone.plugin.TagData;
  width?: number;
};

const Component: FC<Props> = ({ condition, initialValue, width }) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(pluginConditionState, condition);
      set(tagDataState, initialValue);
    }}
  >
    <Observer />
    <Layout>
      <Input width={width || 0} />
      <Tag />
    </Layout>
  </RecoilRoot>
);

export default Component;
