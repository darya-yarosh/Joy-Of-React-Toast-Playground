import React, { useContext } from 'react';

import Toast from '../Toast';

import styles from './ToastShelf.module.css';

import { ToastListContext } from '../ToastProvider/ToastProvider';

function ToastShelf() {
  const toastListContext = useContext(ToastListContext);

  return (
    <ol className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
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
