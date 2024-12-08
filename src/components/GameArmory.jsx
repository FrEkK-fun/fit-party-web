import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

import PlayerClassAndIcon from './PlayerClassAndIcon';

export default function GameArmory({ item }) {
  const armor = item.armorIdMongo || item.weaponIdMongo;
  const owner = item.ownerIdMongo || null;

  const type = item.armorIdMongo ? 'armor' : 'weapon';
  const typeIcon = item.armorIdMongo ? 'shield' : 'swords';

  return (
    <div className="flex flex-col gap-4 rounded-md p-4 text-center text-text-primary hover:bg-background-color-secondary dark:text-text-primary-dark hover:dark:bg-background-color-secondary-dark">
      {armor.icon && (
        <img
          src={armor.icon}
          alt={armor.title}
          className="mx-auto w-48 min-w-40 sm:w-52"
        />
      )}
      {!armor.icon && (
        <FontAwesomeIcon
          icon={byPrefixAndName.fas[typeIcon]}
          className={'text-4xl text-color-system-accent-pink-dark'}
        />
      )}
      <h3 className="min-w-fit text-lg font-semibold">{armor.title}</h3>
      <div className="flex flex-wrap items-center justify-center gap-2 xs:gap-4">
        <p>
          <span>
            <FontAwesomeIcon
              icon={byPrefixAndName.fas[`hand-fist`]}
              className={'mr-1 text-color-system-accent-pink-dark'}
            />
          </span>
          {type === 'armor' ? armor.baseDefense : armor.baseAttack} Base{' '}
          {`${type === 'armor' ? 'Defense' : 'Attack'}`}
        </p>

        <FontAwesomeIcon
          icon={byPrefixAndName.fas[`pipe`]}
          className={
            'text-xl text-border-primary dark:text-border-primary-dark'
          }
        />
        <p>
          <span>
            <FontAwesomeIcon
              icon={byPrefixAndName.fas[`money-bill-wave`]}
              className={'mr-1 text-color-system-accent-pink-dark'}
            />
          </span>
          {armor.cost} Gold
        </p>
      </div>
      {owner && (
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="">Equipped to</p>
          <Link
            to={`/insights/players/${owner._id}`}
            className="hover:underline"
          >
            <p className="-mb-2 font-semibold">{owner.name}</p>
          </Link>
          <PlayerClassAndIcon player={owner} />
        </div>
      )}
    </div>
  );
}
