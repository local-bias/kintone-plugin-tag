import { manager } from '@/lib/event-manager';
import { PLUGIN_ID } from '@/lib/global';
import { restoreStorage } from '@/lib/plugin';
import { getMetaFieldId_UNSTABLE } from '@konomi-app/kintone-utilities';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { getInitialTagData } from '../action';
import App from './app';

manager.add(['app.record.detail.show'], async (event) => {
  const config = restoreStorage(PLUGIN_ID);

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

    //@ts-expect-error
    wrapper.classList.remove(...wrapper.classList);

    const storedData = event.record[condition.configField].value as string;

    const initialValue = storedData ? JSON.parse(storedData) : getInitialTagData();

    const viewId = condition.targetViewId;

    createRoot(wrapper).render(<App {...{ fieldId, viewId, initialValue }} />);
  }

  return event;
});