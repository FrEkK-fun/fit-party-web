export default function FormRadioButton({
  label,
  name,
  value,
  checked,
  onChange,
}) {
  return (
    <div className="flex flex-grow">
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor={value}
        className="w-full rounded border px-4 py-2 text-center text-text-primary hover:bg-background-color-secondary dark:text-text-primary-dark hover:dark:bg-background-color-secondary-dark"
      >
        <span className="sr-only">{label} </span>
        {value}
      </label>
    </div>
  );
}
