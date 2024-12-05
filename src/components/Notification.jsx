import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

export default function Notification({ type, children, ...props }) {
  let styles = 'w-full rounded px-4 py-4 flex gap-2 items-center';

  if (type === 'error') {
    styles +=
      ' border border-border-error dark:border-border-error-dark text-text-error dark:text-text-error-dark bg-background-color-error dark:bg-background-color-error-dark';
  } else {
    styles += ' border text-text-primary dark:text-text-primary-dark ';
  }

  return (
    <div className={styles} {...props}>
      <FontAwesomeIcon
        icon={byPrefixAndName.fas['circle-exclamation']}
        className="text-xl"
      />
      <p>{children}</p>
    </div>
  );
}
