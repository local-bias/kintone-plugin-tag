import { produce } from 'immer';

export const getInitialTagData = (): Plugin.TagData => ({ version: 1, tags: [] });

const migrateTagData = (anyTagData: Plugin.AnyTagData): Plugin.TagData => {
  const { version } = anyTagData;
  switch (version) {
    case undefined:
      //@ts-expect-error
      return migrateTagData({ version: 1, ...anyTagData });
    case 1:
    default:
      return anyTagData;
  }
};

export const decodeTagData = (target: string): Plugin.TagData => {
  const tagData: Plugin.TagData = migrateTagData(JSON.parse(target));

  return produce(tagData, (draft) => {
    for (let index in draft.tags) {
      draft.tags[index].value = decodeURIComponent(draft.tags[index].value);
    }
  });
};
