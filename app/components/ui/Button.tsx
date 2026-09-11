import React from 'react';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const styles = {
    primary:
      'bg-[#991B1E] text-white hover:bg-[#7E1417]',
    outline:
      'border border-[#991B1E] text-[#991B1E] bg-white',
    ghost:
      'bg-transparent text-[#991B1E]',
  };

  return (
    <button
      className={`
        min-h-[48px]
        rounded-xl
        px-5
        py-3
        text-sm
        font-semibold
        transition
        active:scale-[0.98]

        ${styles[variant]}

        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}