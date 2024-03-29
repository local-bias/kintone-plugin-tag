import { restorePluginConfig } from '@/lib/plugin';
import { WORD_CLOUD_ROOT_ID } from '@/lib/static';
import { Root, Container, Label, color, percent } from '@amcharts/amcharts5';
import { WordCloud } from '@amcharts/amcharts5/wc';
import Animated from '@amcharts/amcharts5/themes/Animated';
import { css } from '@emotion/css';
import { getAppId, getAllRecords } from '@konomi-app/kintone-utilities';
import { GUEST_SPACE_ID } from '@/lib/global';
import { manager } from '@/lib/event-manager';

manager.add(['app.record.index.show'], async (event) => {
  const config = restorePluginConfig();

  const found = config.conditions?.find(
    (condition) => condition.wordCloudViewId === String(event.viewId)
  );

  if (!found) {
    return event;
  }

  process.env.NODE_ENV === 'development' && console.log('word-cloud', found);

  const app = getAppId()!;
  const fields = [found.targetField];
  const records = await getAllRecords({
    app,
    fields,
    guestSpaceId: GUEST_SPACE_ID,
    debug: process.env.NODE_ENV === 'development',
  });

  const weights: Record<string, number> = {};
  for (const record of records) {
    const value = record[found.targetField].value as string;
    const tags = value.split(',').map((tag) => tag.trim());
    for (const tag of tags) {
      if (!weights[tag]) {
        weights[tag] = 0;
      }
      weights[tag] += 1;
    }
  }

  document.body.classList.add(css`
    #${WORD_CLOUD_ROOT_ID} {
      width: 100%;
      min-height: calc(100vh - 310px);
    }
  `);

  const root = Root.new(WORD_CLOUD_ROOT_ID);
  root.setThemes([Animated.new(root)]);

  const container = root.container.children.push(
    Container.new(root, {
      width: percent(100),
      height: percent(100),
      layout: root.verticalLayout,
    })
  );

  const title = container.children.push(
    Label.new(root, {
      text: '登録済みのタグ一覧',
      fontSize: 20,
      x: percent(50),
      centerX: percent(50),
    })
  );

  const series = container.children.push(
    WordCloud.new(root, {
      categoryField: 'tag',
      valueField: 'weight',
      calculateAggregates: true,
    })
  );

  series.set('heatRules', [
    {
      target: series.labels.template,
      dataField: 'value',
      min: color(0xffd4c2),
      max: color(0xff621f),
      key: 'fill',
    },
  ]);

  series.labels.template.setAll({
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    fontFamily: 'Courier New',
    cursorOverStyle: 'pointer',
  });

  const seriesData = Object.entries(weights)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 100)
    .map(([tag, weight], i) => ({ tag, weight: weight === 1 ? 1 : 100 - i }));

  process.env.NODE_ENV === 'development' && console.log({ weights, seriesData });

  series.data.setAll(seriesData);

  return event;
});
