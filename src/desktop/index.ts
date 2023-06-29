import Launcher from '@/lib/launcher';

import customFieldsEmbedding from './custom-fields-embedding';
import targetFieldSetting from './target-field-setting';
import configFieldHiding from './config-field-hiding';
import detailDisplaying from './detail-displaying';
import WordCloud from './word-cloud';

((PLUGIN_ID) =>
  new Launcher(PLUGIN_ID).launch([
    customFieldsEmbedding,
    targetFieldSetting,
    configFieldHiding,
    detailDisplaying,
    WordCloud,
  ]))(kintone.$PLUGIN_ID);
