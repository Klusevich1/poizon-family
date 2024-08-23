import React from "react";
import styles from './Loading.module.css'

export const Loading = () => {
  return (
    <div className={styles.spinnerBlock}>
      <span class={styles.spinner}></span>
    </div>
  );
};
