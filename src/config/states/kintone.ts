import { getFormFields, kintoneAPI, getAppId, getViews } from '@konomi-app/kintone-utilities';
import { selector } from 'recoil';
import { GUEST_SPACE_ID, LANGUAGE } from '@/lib/global';

const PREFIX = 'kintone';

export const appFieldsState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}appFieldsState`,
  get: async () => {
    const app = getAppId()!;
    const { properties } = await getFormFields({
      app,
      preview: true,
      guestSpaceId: GUEST_SPACE_ID,
      debug: process.env.NODE_ENV === 'development',
    });

    const values = Object.values(properties);

    return values.sort((a, b) => a.label.localeCompare(b.label, 'ja'));
  },
});

export const flatFieldsState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}flatFieldsState`,
  get: async ({ get }) => {
    const fields = get(appFieldsState);
    return fields.flatMap((field) => {
      if (field.type === 'SUBTABLE') {
        return Object.values(field.fields);
      }
      return field;
    });
  },
});

export const textFieldsState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}textFieldsState`,
  get: async ({ get }) => {
    const allFields = get(appFieldsState);

    return allFields.filter(
      (field) => field.type === 'SINGLE_LINE_TEXT' || field.type === 'MULTI_LINE_TEXT'
    );
  },
});

export const allViewsState = selector<Record<string, kintoneAPI.view.Response>>({
  key: `${PREFIX}allViewsState`,
  get: async () => {
    const { views: allViews } = await getViews({
      app: getAppId()!,
      guestSpaceId: GUEST_SPACE_ID,
      preview: true,
      debug: process.env.NODE_ENV === 'development',
      lang: LANGUAGE as kintoneAPI.rest.Lang,
    });

    const all = {
      '(すべて)': {
        id: '20',
        type: 'LIST',
        name: '(すべて)',
      },
    } as any as Record<string, kintoneAPI.view.Response>;

    return { ...allViews, ...all };
  },
});

export const customizeViewsState = selector<kintoneAPI.view.Response[]>({
  key: `${PREFIX}customizedViewsState`,
  get: async ({ get }) => {
    const allViews = get(allViewsState);

    return Object.values(allViews).filter((view) => view.type === 'CUSTOM');
  },
});
