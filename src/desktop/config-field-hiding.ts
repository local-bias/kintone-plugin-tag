import { PLUGIN_ID } from '@/lib/global';
import { restoreStorage } from '@/lib/plugin';
import { KintoneEventListener } from '@konomi-app/kintone-utilities';
import { setFieldShown } from '@lb-ribbit/kintone-xapp';

export default (listener: KintoneEventListener) =>
  listener.add(
    ['app.record.create.show', 'app.record.edit.show', 'app.record.detail.show'],
    (event) => {
      const config = restoreStorage(PLUGIN_ID);

      const validConditions = config.conditions.filter(
        (condition) =>
          !!condition.targetField && !!condition.configField && condition.hideConfigField
      );

      for (const condition of validConditions) {
        const config = event.record[condition.configField].value;
        if (!config) {
          continue;
        }
        setFieldShown(condition.configField, false);
      }

      return event;
    }
  );
