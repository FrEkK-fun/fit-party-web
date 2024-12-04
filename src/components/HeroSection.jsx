export default function HeroSection({
  title,
  subtitle,
  text,
  sm,
  h1,
  ...props
}) {
  let titleStyle = 'font-bold text-text-header dark:text-text-header-dark';

  if (sm) {
    titleStyle += ' sm:text-3xl text-2xl';
  } else {
    titleStyle += ' sm:text-5xl text-4xl';
  }

  return (
    <div
      {...props}
      className="mx-auto flex w-full flex-col gap-4 px-0 py-12 text-center text-text-primary sm:px-6 sm:py-24 dark:text-text-primary-dark"
    >
      {subtitle && <p>{subtitle}</p>}
      {h1 && <h1 className={titleStyle}>{title}</h1>}
      {!h1 && <h2 className={titleStyle}>{title}</h2>}
      {text && <p className="text-center">{text}</p>}
    </div>
  );
}
