import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

export default function PlayerClassAndIcon({ player }) {
  const playerClass = player.properties.class.toLowerCase();

  let classIcon;
  if (playerClass === 'defender') {
    classIcon = 'shield';
  }
  if (playerClass === 'fighter') {
    classIcon = 'hand-fist';
  }
  if (playerClass === 'explorer') {
    classIcon = 'binoculars';
  }

  return (
    <p className="text-text-highlight dark:text-text-highlight-dark">
      <span className="mr-2">
        <FontAwesomeIcon
          className="text-text-primary dark:text-text-primary-dark"
          icon={byPrefixAndName.fas[classIcon]}
        />
      </span>
      {player.properties.class}
    </p>
  );
}
