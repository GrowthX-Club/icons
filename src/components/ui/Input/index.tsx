import { ChangeEvent, HTMLProps } from 'react';
import styles from './Input.module.css';

type InputProps = HTMLProps<HTMLInputElement> & {};

export const Input = (props: InputProps) => {
  return <input className={styles.base} {...props} />;
};
