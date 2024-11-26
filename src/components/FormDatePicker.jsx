import { useEffect, useState } from 'react';

export default function FormDatePicker({ label, name, value, onChange }) {
  const [defaultValue, setDefaultValue] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDefaultValue(formattedDate);
  }, []);

  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        value={value || defaultValue}
        onChange={onChange}
        className="rounded border border-border-primary bg-background-color-primary px-4 py-2 text-text-primary outline-none focus:outline-none focus:ring-2 focus:ring-border-tertiary dark:border-border-primary-dark dark:bg-background-color-primary-dark dark:text-text-primary-dark dark:focus:ring-border-tertiary-dark"
      />
    </div>
  );
}
