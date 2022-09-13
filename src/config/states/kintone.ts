import { selector } from 'recoil';
import { getAppViews, getUserDefinedFields } from '@common/kintone-api';
import { kx } from '../../types/kintone.api';
import { ViewForResponse } from '@kintone/rest-api-client/lib/client/types';

const PREFIX = 'kintone';

export const appFieldsState = selector<kx.FieldProperty[]>({
  key: `${PREFIX}appFieldsState`,
  get: async () => {
    const properties = await getUserDefinedFields();

    const values = Object.values(properties);

    return values.sort((a, b) => a.label.localeCompare(b.label, 'ja'));
  },
});

export const textFieldsState = selector<kx.FieldProperty[]>({
  key: `${PREFIX}textFieldsState`,
  get: async ({ get }) => {
    const allFields = get(appFieldsState);

    return allFields.filter(
      (field) => field.type === 'SINGLE_LINE_TEXT' || field.type === 'MULTI_LINE_TEXT'
    );
  },
});

export const allViewsState = selector<Record<string, ViewForResponse>>({
  key: `${PREFIX}allViewsState`,
  get: async () => {
    const allViews = await getAppViews();

    const all = {
      '(すべて)': {
        id: '20',
        type: 'LIST',
        name: '(すべて)',
      },
    } as any as Record<string, ViewForResponse>;

    return { ...allViews, ...all };
  },
});
