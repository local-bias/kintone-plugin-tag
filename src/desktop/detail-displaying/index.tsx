import React from 'react';
import { restoreStorage } from '@/common/plugin';
import { getMetaFieldId_UNSTABLE } from '@lb-ribbit/kintone-secrets';

import App from './app';
import { getInitialTagData } from '../action';
import { createRoot } from 'react-dom/client';

const events: launcher.Events = ['app.record.detail.show'];

const action: launcher.Action = async (event, pluginId) => {
  const config = restoreStorage(pluginId);

  const validConditions = config.conditions.filter(
    (condition) => !!condition.targetField && !!condition.configField
  );

  for (const condition of validConditions) {
    const fieldId = getMetaFieldId_UNSTABLE(condition.targetField);

    const wrapper =
      document.querySelector<HTMLDivElement>(`.value-${fieldId} > div`) ||
      document.querySelector<HTMLDivElement>(`.value-${fieldId}`);

    if (!wrapper) {
      return event;
    }

    //@ts-ignore
    wrapper.classList.remove(...wrapper.classList);

    const storedData = event.record[condition.configField].value;

    const initialValue = storedData ? JSON.parse(storedData) : getInitialTagData();

    const viewId = condition.targetViewId;

    createRoot(wrapper).render(<App {...{ fieldId, viewId, initialValue }} />);
  }

  return event;
};

export default { events, action };
