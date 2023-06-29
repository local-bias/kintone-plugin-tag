import React, { Suspense, FC } from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import { restoreStorage } from '@/lib/plugin';
import { PluginErrorBoundary } from '@/lib/components/error-boundary';
import Form from './components/model/form';
import { LoaderWithLabel } from '@konomi-app/ui-react';
import { storageState } from './states/plugin';
import { PluginLayout, PluginContent, PluginBanner } from '@konomi-app/kintone-utility-component';
import Footer from './components/model/footer';
import Sidebar from './components/model/sidebar';
import { URL_PROMOTION } from '@/lib/static';
import { URL_BANNER } from '@/lib/static';
import { PLUGIN_ID } from '@/lib/global';

const Component: FC = () => (
  <Suspense fallback={<LoaderWithLabel label='画面の描画を待機しています' />}>
    <RecoilRoot
      initializeState={({ set }) => {
        set(storageState, restoreStorage(PLUGIN_ID));
      }}
    >
      <PluginErrorBoundary>
        <SnackbarProvider maxSnack={1}>
          <PluginLayout>
            <Suspense fallback={<LoaderWithLabel label='設定情報を取得しています' />}>
              <Sidebar />
              <PluginContent>
                <Form />
              </PluginContent>
              <PluginBanner url={URL_BANNER} />
              <Footer />
            </Suspense>
          </PluginLayout>
        </SnackbarProvider>
      </PluginErrorBoundary>
    </RecoilRoot>
    <iframe
      title='promotion'
      loading='lazy'
      src={URL_PROMOTION}
      style={{ border: '0', width: '100%', height: '64px' }}
    />
  </Suspense>
);

export default Component;
