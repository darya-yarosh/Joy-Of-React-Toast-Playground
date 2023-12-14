import React, { useContext, useEffect } from 'react';

import Toast from '../Toast';

import styles from './ToastShelf.module.css';

import { ToastListContext } from '../ToastProvider/ToastProvider';

function ToastShelf() {
  const toastListContext = useContext(ToastListContext);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (
        event.code === "Escape"
        && toastListContext.toastList.length === 0
      ) {
        toastListContext.closeToastList();
      }
    });

    return (() => {
      document.removeEventListener("keydown", (event) => {
        if (event.code === "Escape") {
          toastListContext.closeToastList();
        }
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ol className={styles.wrapper}>
      {
        toastListContext.toastList.map(toast =>
          <li
            key={toast.id}
            className={styles.toastWrapper}
          >
            <Toast
              variant={toast.variant}
              onClose={() => toastListContext.closeToast(toast.id)}>
              {toast.message}
            </Toast>
          </li>
        )
      }
    </ol>
  );
}

export default ToastShelf;
