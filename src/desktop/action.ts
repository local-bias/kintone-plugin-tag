import produce from 'immer';

export const getInitialTagData = (): kintone.plugin.TagData => ({ tags: [] });

export const decodeTagData = (target: string): kintone.plugin.TagData => {
  const tagData: kintone.plugin.TagData = JSON.parse(target);

  return produce(tagData, (draft) => {
    for (let index in draft.tags) {
      draft.tags[index].value = decodeURIComponent(draft.tags[index].value);
    }
  });
};
