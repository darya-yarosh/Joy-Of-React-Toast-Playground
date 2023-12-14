import React from 'react';

import Toast from '../Toast';

import styles from './ToastShelf.module.css';

function ToastShelf({
  toastList,
  updateToastList,
}) {
  function closeToast(toastId) {
    const filteredToastShelf = toastList.filter(toast => toast.id !== toastId);
    
    updateToastList(filteredToastShelf);
  }

  return (
    <ol className={styles.wrapper}>
      {
        toastList.map(toast =>
          <li
            key={toast.id}
            className={styles.toastWrapper}
          >
            <Toast
              variant={toast.variant}
              onClose={() => closeToast(toast.id)}>
              {toast.message}
            </Toast>
          </li>
        )
      }
    </ol>
  );
}

export default ToastShelf;
