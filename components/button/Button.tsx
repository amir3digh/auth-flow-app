import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ children, ...props }, ref) => (
  <button ref={ref} className={styles.button} {...props}>
    {children}
  </button>
));

Button.displayName = 'Button';
export default Button;
