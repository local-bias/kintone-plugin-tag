// @ts-check
const hp = 'https://konomi.app/';
const cdn = 'https://cdn.jsdelivr.net/gh/local-bias/kintone-plugin-tag@latest';
const localhost = 'https://127.0.0.1:5821';
const key = 'tag';

/** @type {import('@konomi-app/kintone-utilities').PluginConfig} */
export default {
  id: `ribbit-kintone-plugin-${key}`,
  pluginReleasePageUrl: `https://ribbit.konomi.app/kintone-plugin/`,
  manifest: {
    base: {
      manifest_version: 1,
      version: '1.5.0',
      type: 'APP',
      name: {
        en: 'Tagging Plugin',
        ja: 'タグ付けプラグイン',
        zh: '标签插件',
      },
      description: {
        en: 'Add a field that allows multiple registrations of arbitrary strings as tags. By using this plugin, it is possible to standardize the delimiter for tags.',
        ja: '任意の文字列をタグとして複数登録することのできるフィールドを追加します。このプラグインを使用することで、タグの区切りを統一化することが可能です。',
        zh: '添加一个字段，允许将任意字符串作为标签进行多次注册。通过使用此插件，可以统一标签的分隔符。',
      },
      icon: 'icon.png',
      homepage_url: { ja: hp, en: hp },
      desktop: { js: [`${cdn}/common/desktop.js`], css: [] },
      mobile: { js: [`${cdn}/common/desktop.js`], css: [] },
      config: {
        html: 'config.html',
        js: [`${cdn}/common/config.js`],
        css: [],
        required_params: [],
      },
    },
    dev: {
      desktop: {
        js: [`${localhost}/dist/dev/desktop.js`],
        css: [`${localhost}/dist/dev/desktop.css`],
      },
      mobile: {
        js: [`${localhost}/dist/dev/desktop.js`],
        css: [`${localhost}/dist/dev/desktop.css`],
      },
      config: {
        js: [`${localhost}/dist/dev/config.js`],
        css: [`${localhost}/dist/dev/config.css`],
      },
    },
    prod: {
      desktop: { js: [`${cdn}/${key}/desktop.js`], css: [`${cdn}/${key}/desktop.css`] },
      mobile: { js: [`${cdn}/${key}/desktop.js`], css: [`${cdn}/${key}/desktop.css`] },
      config: { js: [`${cdn}/${key}/config.js`], css: [`${cdn}/${key}/config.css`] },
    },
    standalone: {
      desktop: { js: ['desktop.js'] },
      mobile: { js: ['desktop.js'] },
      config: { js: ['config.js'] },
    },
  },
};
