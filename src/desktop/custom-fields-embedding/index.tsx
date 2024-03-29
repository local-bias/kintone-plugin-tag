import React from 'react';
import { restorePluginConfig } from '@/lib/plugin';
import { css } from '@emotion/css';
import App from './app';
import { getInitialTagData } from '../action';
import { createRoot } from 'react-dom/client';
import { isMobile, getMetaFieldId_UNSTABLE } from '@konomi-app/kintone-utilities';
import { manager } from '@/lib/event-manager';

manager.add(['app.record.create.show', 'app.record.edit.show'], (event) => {
  const config = restorePluginConfig();

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
