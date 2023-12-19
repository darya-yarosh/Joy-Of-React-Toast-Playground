import React, { useState } from 'react';

import useKeyDown from '../../hooks/useKeyDown';

export const CurrentToastContext = React.createContext();
export const ToastListContext = React.createContext();

export const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastProvider({ children }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentVariant, setCurrentVariant] = useState(VARIANT_OPTIONS[0]);
  const [toastList, setToastList] = useState([]);

  function createToast() {
    const newToast = {
      id: crypto.randomUUID(),
      message: currentMessage,
      variant: currentVariant,
    }

    setToastList([...toastList, newToast]);
    setCurrentVariant(VARIANT_OPTIONS[0]);
    setCurrentMessage("");
  }

  function closeToast(toastId) {
    const filteredToastShelf = toastList.filter(toast => toast.id !== toastId);

    setToastList(filteredToastShelf);
  }

  function closeToastList() {
    setToastList([]);
  }

  const currentToastProviderValue = {
    message: currentMessage,
    setMessage: setCurrentMessage,
    variant: currentVariant,
    setVariant: setCurrentVariant,
    createToast: () => createToast(),
  }

  const toastListProviderValue = {
    toastList: toastList,
    closeToast: (toastId) => closeToast(toastId),
    closeToastList: () => closeToastList()
  }

  useKeyDown("Escape", () => closeToastList());

  return (
    <CurrentToastContext.Provider value={currentToastProviderValue}>
      <ToastListContext.Provider value={toastListProviderValue}>
        {children}
      </ToastListContext.Provider>
    </CurrentToastContext.Provider>
  )
}

export default ToastProvider;
