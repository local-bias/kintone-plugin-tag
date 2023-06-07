import Launcher from '@/common/launcher';

import customFieldsEmbedding from './custom-fields-embedding';
import targetFieldSetting from './target-field-setting';
import configFieldHiding from './config-field-hiding';
import detailDisplaying from './detail-displaying';

((PLUGIN_ID) =>
  new Launcher(PLUGIN_ID).launch([
    customFieldsEmbedding,
    targetFieldSetting,
    configFieldHiding,
    detailDisplaying,
  ]))(kintone.$PLUGIN_ID);
