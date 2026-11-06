import { createContext, useContext } from 'react';

export const FeedContext = createContext({ status: 'loading', items: [], error: null });

export function useInstagramFeed() {
  return useContext(FeedContext);
}
