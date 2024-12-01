export default function StatBox({ title, stat, team }) {
  let style = 'flex flex-col-reverse gap-4 border-l pl-4';

  if (team === 'red') {
    style += ' border-team-color-red';
  }

  if (team === 'blue') {
    style += ' border-team-color-blue';
  }

  if (team === 'yellow') {
    style += ' border-team-color-yellow';
  }

  if (!team) {
    style += ' border-border-primary dark:border-border-primary-dark';
  }

  return (
    <div className={style}>
      <h4 className="text-sm font-bold text-text-primary dark:text-text-header-dark">
        {title}
      </h4>
      <p className="text-4xl font-bold text-text-highlight dark:text-text-highlight-dark">
        {stat}
      </p>
    </div>
  );
}
