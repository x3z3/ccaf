import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { reducer, createInitialState } from './store.js';
import { save } from '../lib/storage.js';
import { fetchAll } from '../lib/sources/fetchAll.js';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchAll(dispatch);
  }, []);

  useEffect(() => {
    save({ theme: state.ui.theme, bookmarks: state.bookmarks });
  }, [state.ui.theme, state.bookmarks]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.ui.theme === 'dark');
  }, [state.ui.theme]);

  return (
    <StoreContext.Provider value={{ state, dispatch, refresh: () => fetchAll(dispatch) }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within a StoreProvider');
  return ctx;
}
