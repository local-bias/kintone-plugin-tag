import '@/lib/global';
import Launcher from '@/lib/launcher';
import configFieldHiding from './config-field-hiding';
import customFieldsEmbedding from './custom-fields-embedding';
import detailDisplaying from './detail-displaying';
import targetFieldSetting from './target-field-setting';
import WordCloud from './word-cloud';

((PLUGIN_ID) =>
  new Launcher(PLUGIN_ID).launch([
    customFieldsEmbedding,
    targetFieldSetting,
    configFieldHiding,
    detailDisplaying,
    WordCloud,
  ]))(kintone.$PLUGIN_ID);
