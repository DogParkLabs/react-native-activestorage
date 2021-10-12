import React from 'react';
import { Provider } from './Context';

type Props = {
  host: string;
  mountPath?: string;
  headers?: object;
}

const ActiveStorageProvider: React.FC<Props> = ({ host, mountPath, headers, children }) => (
  <Provider value={{ host, mountPath, headers }}>{children}</Provider>
);

export default ActiveStorageProvider;
