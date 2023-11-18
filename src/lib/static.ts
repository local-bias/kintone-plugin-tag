import manifest from '../../plugin/manifest.json';

export const WORD_CLOUD_ROOT_ID = `konomi-app_word-cloud`;

export const PLUGIN_KEY = 'tag';
export const PLUGIN_NAME = manifest.name.ja;
export const PLUGIN_VERSION = manifest.version;

export const LOCAL_STORAGE_PREFIX = 'ribbit-kintone-plugin-';
export const LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}${PLUGIN_KEY}`;

export const URL_HOMEPAGE = manifest.homepage_url.ja;
export const URL_INQUIRY = 'https://form.konomi.app';
export const URL_PROMOTION = 'https://promotion.konomi.app/kintone-plugin';
export const URL_BANNER = 'https://promotion.konomi.app/kintone-plugin/sidebar';
export const URL_PLUGIN_LIST = 'https://ribbit.konomi.app/kintone-plugin';
