import React, { useContext, useEffect, useRef, useState } from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf/ToastShelf';

import styles from './ToastPlayground.module.css';

import { ToastListContext, VARIANT_OPTIONS } from '../ToastProvider/ToastProvider';

function ToastPlayground() {
  const toastListContext = useContext(ToastListContext);

  const [currentMessage, setCurrentMessage] = useState("");
  const [currentVariant, setCurrentVariant] = useState(VARIANT_OPTIONS[0]);

  const messageRef = useRef(null);

  function sendToast(event) {
    event.preventDefault();

    if (currentMessage.trim().length === 0) {
      window.alert(
        `Error:
        \nThe message must contain at least one non-whitespace character.
        \nPlease enter something in the "Message" field.`
      )
      
      return;
    }

    toastListContext.createToast(currentMessage, currentVariant);
    setCurrentVariant(VARIANT_OPTIONS[0]);
    setCurrentMessage("");

    messageRef.current.focus();
  }

  function onChangeMessage(newMessage) {
    setCurrentMessage(newMessage);
  }

  function onChangeVariant(newVariant) {
    setCurrentVariant(newVariant);
  }

  useEffect(() => {
    if (messageRef.current !== null) {
      messageRef.current.focus();
    }
  }, [])

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
              value={currentMessage}
              required
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
                  checked={variant_option === currentVariant}
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
