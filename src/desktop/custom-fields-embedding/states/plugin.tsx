import { atom } from 'recoil';

export const pluginConditionState = atom<kintone.plugin.Condition | null>({
  key: 'pluginConditionState',
  default: null,
});

export const tagDataState = atom<kintone.plugin.TagData>({
  key: 'tagDataState',
  default: { tags: [] },
});
