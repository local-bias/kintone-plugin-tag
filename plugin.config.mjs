const hp = 'https://konomi.app/';
const commonCdn = 'https://cdn.jsdelivr.net/gh/local-bias/kintone-cdn@latest';
const cdn = 'https://cdn.jsdelivr.net/gh/local-bias/kintone-plugin-tag@latest';
const localhost = 'https://127.0.0.1:5500';

/** @type {import('./src/types/plugin-config').PluginConfig} */
export default {
  manifest: {
    base: {
      manifest_version: 1,
      version: '1.3.1',
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
      desktop: {
        js: [`${commonCdn}/dist/desktop.js`],
        css: [],
      },
      mobile: {
        js: [`${commonCdn}/dist/desktop.js`],
        css: [],
      },
      config: {
        html: 'config.html',
        js: [`${commonCdn}/dist/config.js`],
        css: [],
        required_params: [],
      },
    },
    dev: {
      desktop: { js: [`${localhost}/dist/dev/desktop/index.js`] },
      mobile: { js: [`${localhost}/dist/dev/desktop/index.js`] },
      config: { js: [`${localhost}/dist/dev/config/index.js`] },
    },
    prod: {
      desktop: { js: [`${cdn}/cdn/desktop.js`] },
      mobile: { js: [`${cdn}/cdn/desktop.js`] },
      config: { js: [`${cdn}/cdn/config.js`] },
    },
    standalone: {
      desktop: { js: ['desktop.js'] },
      mobile: { js: ['desktop.js'] },
      config: { js: ['config.js'] },
    },
  },
};
