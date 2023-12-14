import React, { useState } from 'react';

import Button from '../Button';
import Toast from '../Toast/Toast';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = useState("");
  const [currentVariant, setCurrentVariant] = useState(VARIANT_OPTIONS[0]);
  const [isShowingToast, setIsShowingToast] = useState(false);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {isShowingToast &&
        <Toast
          message={message}
          type={currentVariant}
          onClose={() => setIsShowingToast(false)}
        />}

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map(variant_option =>
              <label
                key={`variant-${variant_option}`}
                htmlFor={`variant-${variant_option}`}
              >
                <input
                  id={`variant-${variant_option}`}
                  type="radio"
                  name="variant"
                  value={variant_option}
                  checked={variant_option === currentVariant}
                  onChange={
                    (event) =>
                      setCurrentVariant(event.target.value)
                  }
                />
                {variant_option}
              </label>)}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button onClick={
              () =>
                setIsShowingToast(true)
            }>
              Pop Toast!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
