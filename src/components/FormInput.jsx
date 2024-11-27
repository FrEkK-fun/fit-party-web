export default function FormInput({
  label,
  hideLabel,
  type,
  name,
  value,
  placeholder,
  onChange,
}) {
  const labelClass = hideLabel ? 'sr-only' : '';

  return (
    <div className="w-full flex-col gap-2 text-text-primary dark:text-text-primary-dark">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="min-w-full rounded border border-border-primary bg-background-color-primary px-4 py-2 text-text-primary outline-none focus:outline-none focus:ring-2 focus:ring-border-tertiary dark:border-border-primary-dark dark:bg-background-color-primary-dark dark:text-text-primary-dark dark:focus:ring-border-tertiary-dark"
      />
    </div>
  );
}
