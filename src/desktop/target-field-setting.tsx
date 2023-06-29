import { PLUGIN_ID } from '@/lib/global';
import { restoreStorage } from '@/lib/plugin';
import { KintoneEventListener } from '@konomi-app/kintone-utilities';

export default (listener: KintoneEventListener) => {
  listener.add(
    ['app.record.edit.submit', 'app.record.create.submit', 'app.record.index.edit.submit'],
    (event) => {
      const config = restoreStorage(PLUGIN_ID);

      const validConditions = config.conditions.filter(
        (condition) => !!condition.targetField && !!condition.configField
      );

      for (const condition of validConditions) {
        const config = event.record[condition.configField].value as string;
        if (!config) {
          continue;
        }

        const tagData: kintone.plugin.TagData = JSON.parse(config);
        if (tagData?.tags?.length === undefined) {
          continue;
        }

        event.record[condition.targetField].value = tagData.tags
          .map(({ value }) => value)
          .join(', ');
      }

      return event;
    }
  );
};
