export default function Button({ type, wFull, children, ...props }) {
  // Base style shared by all button types
  let baseStyle =
    'min-w-fit rounded border px-4 py-2 text-text-primary dark:text-text-primary-dark hover:bg-background-color-secondary hover:dark:bg-background-color-secondary-dark';

  // Type-specific styles
  const buttonStyles = {
    primary:
      'border-border-tertiary bg-background-color-button-primary dark:border-border-tertiary-dark dark:bg-background-color-button-primary-dark',
    secondary:
      'border-border-tertiary bg-background-color-button-secondary dark:border-border-tertiary-dark dark:bg-background-color-button-secondary-dark dark:hover:border-border-secondary-dark hover:border-border-secondary',
  };

  if (wFull) {
    baseStyle += ' w-full';
  } else {
    baseStyle += ' w-auto';
  }

  // In your component:
  let style = `${baseStyle} ${buttonStyles[type] || buttonStyles.primary}`;

  return (
    <button {...props} className={style}>
      {children}
    </button>
  );
}
