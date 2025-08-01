import React, { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => (
  <div className={styles.inputGroup}>
    {label && <label className={styles.label}>{label}</label>}
    <input ref={ref} className={styles.input} {...props} />
    {error && <span className={styles.error}>{error}</span>}
  </div>
));

Input.displayName = 'Input';
export default Input;
