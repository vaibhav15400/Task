import { useCallback, useState } from 'react';

export function useModalState(deafultValue = false) {
  const [isOpen, setIsOpen] = useState(deafultValue);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return { isOpen, open, close };
}
// export function Contextstate(children) {
//   const Context = createContext(children);
//   return <Context.Provider>{children}</Context.Provider>;
// }
