import React from 'react';
import { restoreStorage } from '@common/plugin';
import { getMetaFieldId_UNSTABLE } from '@lb-ribbit/kintone-secrets';
import { css } from '@emotion/css';

import App from './app';
import { getInitialTagData } from '../action';
import { createRoot } from 'react-dom/client';
import { isMobile } from '@lb-ribbit/kintone-xapp';

const events: launcher.Events = ['app.record.create.show', 'app.record.edit.show'];

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

    if (!isMobile()) {
      const fieldWrapper = document.querySelector(`.field-${fieldId}`);

      if (fieldWrapper) {
        const width = fieldWrapper.clientWidth;

        fieldWrapper.classList.add(css`
          width: ${width + 120}px !important;
        `);
      }
    }

    wrapper.classList.add(css`
      display: block;
      input {
        min-width: 60px;
      }
    `);

    const div = document.createElement('div');
    wrapper.prepend(div);
    div.classList.add(css`
      display: block;
    `);

    wrapper.innerHTML = '';
    wrapper.append(div);

    const storedData = event.record[condition.configField].value;

    const initialValue = storedData ? JSON.parse(storedData) : getInitialTagData();

    console.log('🐇', { initialValue, wrapper });

    createRoot(div).render(<App {...{ condition, initialValue, width }} />);
  }

  return event;
};

export default { events, action };
