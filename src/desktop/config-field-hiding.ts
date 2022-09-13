import { restoreStorage } from '@common/plugin';
import { setFieldShown } from '@lb-ribbit/kintone-xapp';

const events: launcher.Events = [
  'app.record.create.show',
  'app.record.edit.show',
  'app.record.detail.show',
];

const action: launcher.Action = (event, pluginId) => {
  const config = restoreStorage(pluginId);

  const validConditions = config.conditions.filter(
    (condition) => !!condition.targetField && !!condition.configField && condition.hideConfigField
  );

  for (const condition of validConditions) {
    const config = event.record[condition.configField].value;
    if (!config) {
      continue;
    }
    setFieldShown(condition.configField, false);
  }

  return event;
};

export default { events, action };
