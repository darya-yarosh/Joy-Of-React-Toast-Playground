import React, { useState } from 'react';

import useKeyDown from '../../hooks/useKeyDown';

export const ToastListContext = React.createContext();

export const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastProvider({ children }) {
  const [toastList, setToastList] = useState([]);

  function createToast(message, variant) {
    const newToast = {
      id: crypto.randomUUID(),
      message: message,
      variant: variant,
    }

    setToastList([...toastList, newToast]);
  }

  function closeToast(toastId) {
    const filteredToastShelf = toastList.filter(toast => toast.id !== toastId);

    setToastList(filteredToastShelf);
  }

  function closeToastList() {
    setToastList([]);
  }

  const toastListProviderValue = {
    toastList: toastList,
    createToast: (message, variant) => createToast(message, variant),
    closeToast: (toastId) => closeToast(toastId),
    closeToastList: () => closeToastList()
  }

  useKeyDown("Escape", () => closeToastList());

  return (
    <ToastListContext.Provider value={toastListProviderValue}>
      {children}
    </ToastListContext.Provider>
  )
}

export default ToastProvider;
