import React, { Suspense, FC } from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import { restoreStorage } from '@/common/plugin';
import { PluginErrorBoundary } from '@/common/components/error-boundary';

import Form from './components/form';
import Footer from './components/footer';
import { Loading } from '@/common/components/loading';
import { pluginIdState, storageState } from './states/plugin';

const Component: FC<{ pluginId: string }> = ({ pluginId }) => (
  <Suspense fallback={<Loading label='画面の描画を待機しています' />}>
    <RecoilRoot
      initializeState={({ set }) => {
        set(pluginIdState, pluginId);
        set(storageState, restoreStorage(pluginId));
      }}
    >
      <PluginErrorBoundary>
        <SnackbarProvider maxSnack={1}>
          <Suspense fallback={<Loading label='設定情報を取得しています' />}>
            <Form />
            <Footer />
          </Suspense>
        </SnackbarProvider>
      </PluginErrorBoundary>
    </RecoilRoot>
  </Suspense>
);

export default Component;
