import { createContext } from 'react';

type ContextType = {
  host: string;
  mountPath?: string;
  headers?: object;
}

const defaultContext = {
  host: 'http://localhost:3000',
  mountPath: '/rails/active_storage',
  headers: {}
};

export const Context = createContext<ContextType>(defaultContext);
export const { Consumer, Provider } = Context;

export default Context;
