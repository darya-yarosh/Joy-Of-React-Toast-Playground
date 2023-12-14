import React, { useContext, useEffect, useRef } from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf/ToastShelf';

import styles from './ToastPlayground.module.css';

import { CurrentToastContext, VARIANT_OPTIONS } from '../ToastProvider/ToastProvider';

function ToastPlayground() {
  const currentToastContext = useContext(CurrentToastContext);

  const messageRef = useRef(null);

  function sendToast(event) {
    event.preventDefault();
    currentToastContext.createToast();

    messageRef.current.focus();
  }

  function onChangeMessage(newMessage) {
    currentToastContext.setMessage(newMessage);
  }

  function onChangeVariant(newVariant) {
    currentToastContext.setVariant(newVariant);
  }

  useEffect(() => {
    if (messageRef.current !== null) {
      messageRef.current.focus();
    }
  }, [])

  if (currentToastContext === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form
        className={styles.controlsWrapper}
        onSubmit={sendToast}
      >
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
              ref={messageRef}
              className={styles.messageInput}
              value={currentToastContext.message}
              onChange={(event) => onChangeMessage(event.target.value)}
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
                  checked={variant_option === currentToastContext.variant}
                  onChange={
                    (event) =>
                      onChangeVariant(event.target.value)
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
            <Button>
              Pop Toast!
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
