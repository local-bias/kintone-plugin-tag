import React from 'react';
import { restoreStorage } from '@common/plugin';
import { getMetaFieldId_UNSTABLE } from '@lb-ribbit/kintone-secrets';
import { css } from '@emotion/css';

import App from './app';
import { getInitialTagData } from '../action';
import { createRoot } from 'react-dom/client';
import { isMobile } from '@lb-ribbit/kintone-xapp';

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
    const width = wrapper.clientWidth;

    //@ts-ignore
    wrapper.classList.remove(...wrapper.classList);

    const storedData = event.record[condition.configField].value;

    const initialValue = storedData ? JSON.parse(storedData) : getInitialTagData();

    createRoot(wrapper).render(<App {...{ condition, initialValue, width }} />);
  }

  return event;
};

export default { events, action };
