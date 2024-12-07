import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

export default function PlayerGoalAndIcon({ player }) {
  let goalDesc;
  if (player.weekly.goal.description) {
    goalDesc = player.weekly.goal.description;
  } else {
    goalDesc = 'Goal not set!';
  }

  let goalIcon;
  let goalIconClass = 'mr-2';
  if (player.weekly.goal.done) {
    goalIcon = 'check-circle';
    goalIconClass += 'text-text-success dark:text-text-success-dark';
  } else if (
    !player.weekly.goal.done &&
    player.weekly.goal.description !== ''
  ) {
    goalIcon = 'spinner-scale';
  } else if (player.weekly.goal.description === '') {
    goalIcon = 'triangle-exclamation';
  }

  return (
    <div className="flex items-center gap-1 font-medium">
      <FontAwesomeIcon
        className={goalIconClass}
        icon={byPrefixAndName.fad[goalIcon]}
      />
      <p className="font-light italic">{goalDesc}</p>
    </div>
  );
}
