import React from 'react';
import { restoreStorage } from '@/lib/plugin';
import { getMetaFieldId_UNSTABLE } from '@lb-ribbit/kintone-secrets';

import App from './app';
import { getInitialTagData } from '../action';
import { createRoot } from 'react-dom/client';
import { KintoneEventListener } from '@konomi-app/kintone-utilities';
import { PLUGIN_ID } from '@/lib/global';

export default (listener: KintoneEventListener) => {
  listener.add(['app.record.detail.show'], async (event) => {
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

      //@ts-ignore
      wrapper.classList.remove(...wrapper.classList);

      const storedData = event.record[condition.configField].value as string;

      const initialValue = storedData ? JSON.parse(storedData) : getInitialTagData();

      const viewId = condition.targetViewId;

      createRoot(wrapper).render(<App {...{ fieldId, viewId, initialValue }} />);
    }

    return event;
  });
};
