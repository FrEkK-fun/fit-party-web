export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full rounded border border-border-tertiary bg-background-color-button-primary px-4 py-2 text-text-primary hover:bg-background-color-secondary dark:border-border-tertiary-dark dark:bg-background-color-button-primary-dark dark:text-text-primary-dark hover:dark:bg-background-color-secondary-dark"
    >
      {children}
    </button>
  );
}
