import { manager } from '@/lib/event-manager';
import { restorePluginConfig } from '@/lib/plugin';

manager.add(
  ['app.record.edit.submit', 'app.record.create.submit', 'app.record.index.edit.submit'],
  (event) => {
    const config = restorePluginConfig();

    const validConditions = config.conditions.filter(
      (condition) => !!condition.targetField && !!condition.configField
    );

    for (const condition of validConditions) {
      const config = event.record[condition.configField].value as string;
      if (!config) {
        continue;
      }

      const tagData: Plugin.TagData = JSON.parse(config);
      if (tagData?.tags?.length === undefined) {
        continue;
      }

      event.record[condition.targetField].value = tagData.tags.map(({ value }) => value).join(', ');
    }

    return event;
  }
);
