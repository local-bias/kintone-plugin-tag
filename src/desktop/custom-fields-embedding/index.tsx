import React from 'react';
import { restoreStorage } from '@/lib/plugin';
import { getMetaFieldId_UNSTABLE } from '@lb-ribbit/kintone-secrets';
import { css } from '@emotion/css';

import App from './app';
import { getInitialTagData } from '../action';
import { createRoot } from 'react-dom/client';
import { isMobile } from '@lb-ribbit/kintone-xapp';
import { PLUGIN_ID } from '@/lib/global';
import { KintoneEventListener } from '@konomi-app/kintone-utilities';

export default (listener: KintoneEventListener) => {
  listener.add(['app.record.create.show', 'app.record.edit.show'], (event) => {
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
        continue;
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

      const storedData = event.record[condition.configField].value as string;

      const initialValue = storedData ? JSON.parse(storedData) : getInitialTagData();

      createRoot(div).render(<App {...{ condition, initialValue, width }} />);
    }

    return event;
  });
};
