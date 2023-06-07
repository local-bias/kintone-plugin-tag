import React, { FCX } from 'react';
import styled from '@emotion/styled';
import DeletionButton from './condition-deletion-button';
import TargetFieldForm from './form-target-field';
import ConfigFieldForm from './form-config-field';
import TargetViewIdForm from './form-target-view-id';
import HideConfigFieldForm from './form-config-shown';
import WordCloudForm from './form-word-cloud';

const Component: FCX = ({ className }) => {
  return (
    <div {...{ className }}>
      <div>
        <h3>タグを入力・表示するフィールド</h3>
        <TargetFieldForm />
      </div>
      <div>
        <h3>タグの設定情報を格納するフィールド</h3>
        <ConfigFieldForm />
      </div>
      <div>
        <h3>タグの設定情報フィールドの表示有無</h3>
        <HideConfigFieldForm />
      </div>
      <div>
        <h3>タグクリック時に表示する一覧</h3>
        <TargetViewIdForm />
      </div>
      <div>
        <h3>ワードクラウド機能を表示する一覧</h3>
        <WordCloudForm />
      </div>
      <div style={{ marginTop: '1.5em' }}>
        <DeletionButton />
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  padding: 0 16px;
  > div {
    padding: 8px 8px 8px 16px;
    > h3 {
      font-weight: 500;
      margin-bottom: 16px;
    }
  }
`;

export default StyledComponent;
