import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

export default function GameCard({ card }) {
  return (
    <div className="flex flex-col gap-2 rounded-md p-4 text-center text-text-primary hover:bg-background-color-secondary dark:text-text-primary-dark hover:dark:bg-background-color-secondary-dark">
      <img
        src={card.icon ? card.icon : '/img/CardIcon.png'}
        alt={card.title}
        className="mx-auto w-48 min-w-40 sm:w-52"
      />
      <h3 className="min-w-fit text-lg font-semibold">{card.title}</h3>
      <p>
        <span>
          <FontAwesomeIcon
            icon={byPrefixAndName.fas[`money-bill-wave`]}
            className={'mr-1 text-color-system-accent-pink-dark'}
          />
        </span>
        {card.cost} AP
      </p>
    </div>
  );
}
