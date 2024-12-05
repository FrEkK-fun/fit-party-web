import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

export default function GameCard({ card }) {
  return (
    <div className="flex flex-col gap-2 text-center text-text-primary dark:text-text-primary-dark">
      <img
        src={card.icon ? card.icon : '/img/CardIcon.png'}
        alt={card.title}
        className="mx-auto w-48 min-w-40 sm:w-52"
      />
      <h3 className="min-w-fit font-semibold">{card.title}</h3>
      <p>
        <span>
          <FontAwesomeIcon
            icon={byPrefixAndName.fas[`money-bill-wave`]}
            className={'dark:text-highlight-dark mr-1 text-text-highlight'}
          />
        </span>
        {card.cost} AP
      </p>
    </div>
  );
}
