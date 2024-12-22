export default function FormRadioButton({
  label,
  name,
  value,
  checked,
  onChange,
}) {
  return (
    <div className="group flex flex-grow">
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <label
        htmlFor={value}
        className="w-full rounded border border-border-tertiary px-4 py-2 text-center text-text-primary hover:cursor-pointer hover:border-border-secondary peer-checked:bg-background-color-button-primary dark:border-border-tertiary-dark dark:text-text-primary-dark dark:hover:border-border-secondary-dark dark:peer-checked:bg-background-color-button-primary-dark"
      >
        <span className="sr-only">{label} </span>
        {value}
      </label>
    </div>
  );
}
