export default function HeroSection({ title, subtitle, text, h1, ...props }) {
  const titleStyle =
    'mb-6 text-center text-4xl font-bold text-text-header sm:text-5xl dark:text-text-header-dark';

  return (
    <div
      {...props}
      className="mx-auto w-full px-0 py-12 text-text-primary sm:px-6 sm:py-24 dark:text-text-primary-dark"
    >
      {subtitle && <p>{subtitle}</p>}
      {h1 && <h1 className={titleStyle}>{title}</h1>}
      {!h1 && <h2 className={titleStyle}>{title}</h2>}
      <p className="text-center">{text}</p>
    </div>
  );
}