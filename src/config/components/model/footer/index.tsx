import { getAppId, getViews, storeStorage, updateViews } from '@konomi-app/kintone-utilities';
import SaveIcon from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Button, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { FC, useCallback } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { PluginFooter } from '@konomi-app/kintone-utilities-react';
import { loadingState, storageState } from '../../../states/plugin';

import ExportButton from './export-button';
import ImportButton from './import-button';
import ResetButton from './reset-button';
import { t } from '@/lib/i18n';
import { produce } from 'immer';
import { GUEST_SPACE_ID } from '@/lib/global';
import { WORD_CLOUD_ROOT_ID } from '@/lib/static';

type Props = {
  onSaveButtonClick: () => void;
  onBackButtonClick: () => void;
};

const Component: FC<Props> = ({ onSaveButtonClick, onBackButtonClick }) => {
  const loading = useRecoilValue(loadingState);

  return (
    <PluginFooter className='py-2'>
      <div className='flex items-center gap-4'>
        <Button
          variant='contained'
          color='primary'
          disabled={loading}
          onClick={onSaveButtonClick}
          startIcon={loading ? <CircularProgress color='inherit' size={20} /> : <SaveIcon />}
        >
          {t('config.button.save')}
        </Button>
        <Button
          variant='contained'
          color='inherit'
          disabled={loading}
          onClick={onBackButtonClick}
          startIcon={
            loading ? <CircularProgress color='inherit' size={20} /> : <SettingsBackupRestoreIcon />
          }
        >
          {t('config.button.return')}
        </Button>
      </div>
      <div className='flex items-center gap-4'>
        <ExportButton />
        <ImportButton />
        <ResetButton />
      </div>
    </PluginFooter>
  );
};

const Container: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onBackButtonClick = useCallback(() => history.back(), []);

  const onSaveButtonClick = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        set(loadingState, true);
        try {
          const storage = await snapshot.getPromise(storageState);

          const app = getAppId();
          if (!app) {
            throw new Error('アプリのフィールド情報が取得できませんでした');
          }
          const { views } = await getViews({
            app,
            preview: true,
            guestSpaceId: GUEST_SPACE_ID,
            debug: process.env.NODE_ENV === 'development',
          });

          const newViews = produce(views, (draft) => {
            for (const condition of storage?.conditions || []) {
              for (const view of Object.values(draft)) {
                if (view.id === condition.wordCloudViewId && view.type === 'CUSTOM') {
                  view.html = `<div id='${WORD_CLOUD_ROOT_ID}'></div>`;
                  view.pager = false;
                }
              }
            }
          });

          let warning: string = '';
          try {
            await updateViews({
              app,
              views: newViews,
              guestSpaceId: GUEST_SPACE_ID,
              debug: process.env.NODE_ENV === 'development',
            });
          } catch (error: any) {
            console.error(error);
            if (error?.code === 'CB_NO02') {
              warning =
                '設定を更新しましたが、システム管理権限がないため、一覧の更新がスキップされました。';
            }
          }

          storeStorage(storage!, () => true);
          if (warning) {
            enqueueSnackbar(warning, {
              variant: 'warning',
              action: (
                <Button color='inherit' size='small' variant='outlined' onClick={onBackButtonClick}>
                  プラグイン一覧に戻る
                </Button>
              ),
            });
          } else {
            enqueueSnackbar('設定を保存しました', {
              variant: 'success',
              action: (
                <Button color='inherit' size='small' variant='outlined' onClick={onBackButtonClick}>
                  プラグイン一覧に戻る
                </Button>
              ),
            });
          }
        } finally {
          set(loadingState, false);
        }
      },
    []
  );

  return <Component {...{ onSaveButtonClick, onBackButtonClick }} />;
};

export default Container;
