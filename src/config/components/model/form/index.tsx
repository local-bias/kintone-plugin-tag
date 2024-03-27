import React, { FC } from 'react';

import {
  PluginFormSection,
  PluginFormTitle,
  PluginFormDescription,
} from '@konomi-app/kintone-utilities-react';
import DeleteButton from './condition-delete-button';
import TargetFieldForm from './form-target-field';
import ConfigFieldForm from './form-config-field';
import TargetViewIdForm from './form-target-view-id';
import HideConfigFieldForm from './form-config-shown';
import WordCloudForm from './form-word-cloud';

const Component: FC = () => (
  <div className='p-4'>
    <PluginFormSection>
      <PluginFormTitle>タグを編集・表示するフィールド</PluginFormTitle>
      <PluginFormDescription>
        タグの編集・表示を行うフィールドを選択してください。
      </PluginFormDescription>
      <PluginFormDescription last>
        設定できるフィールドはテキストフィールドのみです。
      </PluginFormDescription>
      <TargetFieldForm />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>タグの設定情報を格納するフィールド</PluginFormTitle>
      <PluginFormDescription>
        タグの設定情報を格納するフィールドを選択してください。
      </PluginFormDescription>
      <PluginFormDescription last>
        タグを正しく表示するために必要となるもので、ユーザーに表示する必要はありません。
      </PluginFormDescription>
      <ConfigFieldForm />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>タグの設定情報フィールドの表示有無</PluginFormTitle>
      <PluginFormDescription last>
        タグの設定情報をレコード編集画面、詳細画面で表示するか選択してください。
      </PluginFormDescription>
      <HideConfigFieldForm />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>タグクリック時に表示する一覧</PluginFormTitle>
      <PluginFormDescription last>
        レコード編集画面で作成されたタグをクリックした際に遷移する一覧を選択してください。
      </PluginFormDescription>
      <TargetViewIdForm />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>ワードクラウド機能を表示する一覧</PluginFormTitle>
      <PluginFormDescription>
        タグのワードクラウドを表示する一覧を選択してください。
      </PluginFormDescription>
      <PluginFormDescription last>
        設定できる一覧は表示形式がカスタマイズの一覧のみです。
      </PluginFormDescription>
      <WordCloudForm />
    </PluginFormSection>
    <DeleteButton />
  </div>
);

export default Component;
