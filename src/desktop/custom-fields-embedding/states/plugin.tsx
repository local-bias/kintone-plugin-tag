import { getInitialTagData } from '@/desktop/action';
import { atom } from 'recoil';

export const pluginConditionState = atom<Plugin.Condition | null>({
  key: 'pluginConditionState',
  default: null,
});

export const tagDataState = atom<Plugin.TagData>({
  key: 'tagDataState',
  default: getInitialTagData(),
});
