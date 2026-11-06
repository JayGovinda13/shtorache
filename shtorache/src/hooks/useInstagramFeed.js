import { createContext, useContext } from 'react';

export const FeedContext = createContext({
  status: 'loading',
  items: [],
  hasMore: false,
  loadingMore: false,
  error: null,
  loadMore: () => {},
});

export function useInstagramFeed() {
  return useContext(FeedContext);
}
