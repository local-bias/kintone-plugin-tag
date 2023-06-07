import { restoreStorage } from '@/common/plugin';

const events: launcher.Events = [
  'app.record.edit.submit',
  'app.record.create.submit',
  'app.record.index.edit.submit',
];

const action: launcher.Action = (event, pluginId) => {
  const config = restoreStorage(pluginId);

  const validConditions = config.conditions.filter(
    (condition) => !!condition.targetField && !!condition.configField
  );

  for (const condition of validConditions) {
    const config = event.record[condition.configField].value;
    if (!config) {
      continue;
    }

    const tagData: kintone.plugin.TagData = JSON.parse(config);
    if (tagData?.tags?.length === undefined) {
      continue;
    }

    event.record[condition.targetField].value = tagData.tags.map(({ value }) => value).join(', ');
  }

  return event;
};

export default { events, action };
