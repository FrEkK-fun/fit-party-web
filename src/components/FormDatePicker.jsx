import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

export default function FormDatePicker({
  label,
  name,
  value,
  maxToday,
  minThisWeek,
  onChange,
}) {
  const [defaultValue, setDefaultValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [minValue, setMinValue] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDefaultValue(formattedDate);
    setMaxValue(formattedDate);

    if (minThisWeek) {
      const currentDay = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(
        today.getDate() - (currentDay === 0 ? 6 : currentDay - 1)
      );
      const formattedMinDate = startOfWeek.toISOString().split('T')[0];
      setMinValue(formattedMinDate);
    }
  }, [minThisWeek]);

  return (
    <div className="relative w-full">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        value={value || defaultValue}
        onChange={onChange}
        max={maxToday && maxValue}
        min={minThisWeek && minValue}
        className="w-full appearance-none rounded border border-border-primary bg-background-color-primary px-4 py-2 text-text-primary outline-none focus:outline-none focus:ring-2 focus:ring-border-tertiary dark:border-border-primary-dark dark:bg-background-color-primary-dark dark:text-text-primary-dark dark:focus:ring-border-tertiary-dark"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <FontAwesomeIcon
          icon={byPrefixAndName.fas['calendar-alt']}
          className="text-xl text-color-system-accent-pink"
        />
      </div>
    </div>
  );
}
