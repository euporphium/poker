import { useContext } from 'react';
import { PokerContext, PokerDispatchContext } from './PokerContext.tsx';

export default function usePoker() {
  const pokerContext = useContext(PokerContext);

  if (!pokerContext) {
    throw new Error('usePoker must be used within a PokerProvider');
  }

  return pokerContext;
}

export function usePokerDispatch() {
  const pokerDispatchContext = useContext(PokerDispatchContext);

  if (!pokerDispatchContext) {
    throw new Error(
      'usePokerDispatch must be used within a PokerDispatchProvider'
    );
  }

  return pokerDispatchContext;
}
