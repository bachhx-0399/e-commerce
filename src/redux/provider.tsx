import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export function Providers({ children }: { children: React.ReactNode }): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}
