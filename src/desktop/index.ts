import '@/lib/global';
import configFieldHiding from './config-field-hiding';
import customFieldsEmbedding from './custom-fields-embedding';
import detailDisplaying from './detail-displaying';
import targetFieldSetting from './target-field-setting';
import WordCloud from './word-cloud';
import { pushPluginName } from '@/lib/local-storage';
import { KintoneEventListener } from '@konomi-app/kintone-utilities';
import { PLUGIN_NAME } from '@/lib/static';

try {
  pushPluginName();
} catch (error) {}

const listener = new KintoneEventListener({
  errorHandler: (error, props) => {
    const { event } = props;
    event.error = `プラグイン「${PLUGIN_NAME}」の処理内でエラーが発生しました。`;
    console.error('エラー', error);
  },
  logDisabled: process.env.NODE_ENV === 'production',
});

customFieldsEmbedding(listener);
targetFieldSetting(listener);
configFieldHiding(listener);
detailDisplaying(listener);
WordCloud(listener);
