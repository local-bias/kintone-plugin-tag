declare namespace Plugin {
  /** 🔌 プラグインがアプリ単位で保存する設定情報 */
  type Config = ConfigV1;

  /** 🔌 プラグインの詳細設定 */
  type Condition = Config['conditions'][number];

  /** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
  type AnyConfig = ConfigV1; // | ConfigV2 | ...;

  type ConfigV1 = {
    version: 1;
    conditions: {
      targetViewId: string;
      targetField: string;
      configField: string;
      hideConfigField: boolean;
      wordCloudViewId: string;
    }[];
  };

  type TagData = TagDataV1;

  type AnyTagData = TagDataV1; // | TagDataV2 | ...;

  type TagDataV1 = {
    version: 1;
    tags: { value: string }[];
  };
}
