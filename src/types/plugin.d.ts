declare namespace kintone {
  namespace plugin {
    /** プラグインがアプリ単位で保存する設定情報🔌 */
    type Storage = {
      conditions: Condition[];
    };

    /** プラグインの制御単位の設定情報🔌 */
    type Condition = { targetField: string; configField: string; hideConfigField: boolean };

    type TagData = {
      tags: { value: string }[];
    };
  }
}
