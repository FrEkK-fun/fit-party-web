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
    <div className="flex flex-col gap-4 text-center text-text-primary dark:text-text-primary-dark">
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
      {owner && (
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="">Equipped to</p>
          <Link to={`/players/${owner._id}`} className="hover:underline">
            <p className="-mb-2 font-semibold">{owner.name}</p>
          </Link>
          <PlayerClassAndIcon player={owner} />
        </div>
      )}
    </div>
  );
}
