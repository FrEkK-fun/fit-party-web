export default function DocTopicHeader({ title, category, ...props }) {
  let titleStyle =
    'font-bold text-text-header dark:text-text-header-dark sm:text-5xl text-4xl';

  return (
    <div
      {...props}
      className="gap-2text-text-primary flex w-full flex-col dark:text-text-primary-dark"
    >
      {category && (
        <p className="text-text-highlight dark:text-text-highlight-dark">
          {category}
        </p>
      )}
      <h1 className={titleStyle}>{title}</h1>
    </div>
  );
}
