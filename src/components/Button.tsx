import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}) => {
  const buttonClassName = `${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`;

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
