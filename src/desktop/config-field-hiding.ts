import { manager } from '@/lib/event-manager';
import { restorePluginConfig } from '@/lib/plugin';
import { setFieldShown } from '@konomi-app/kintone-utilities';

manager.add(
  ['app.record.create.show', 'app.record.edit.show', 'app.record.detail.show'],
  (event) => {
    const config = restorePluginConfig();

    const validConditions = config.conditions.filter(
      (condition) => !!condition.targetField && !!condition.configField && condition.hideConfigField
    );

    for (const condition of validConditions) {
      setFieldShown(condition.configField, false);
    }

    return event;
  }
);
