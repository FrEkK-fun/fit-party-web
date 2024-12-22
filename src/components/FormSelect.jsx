export default function FormSelect({ label, value, onChange, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={label}
        className="text-text-primary dark:text-text-primary-dark"
      >
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={onChange}
        className="focus:ring-primary dark:focus:ring-primary-dark rounded-md border border-border-primary p-2 focus:outline-none focus:ring-2 dark:border-border-primary-dark"
      >
        {children}
      </select>
    </div>
  );
}
