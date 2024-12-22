export default function DocsOnThisPage({ activeSection }) {
  return (
    <div className="sticky top-0 h-screen space-y-4 px-2 py-12">
      <h5 className="font-bold text-text-highlight dark:text-text-highlight-dark">
        On this page
      </h5>
      {/* <nav className="text-sm">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`block px-3 py-2 ${
              activeSection === section.id
                ? 'text-color-system-accent-pink'
                : 'text-text-primary hover:text-color-system-accent-pink'
            }`}
          >
            {section.title}
          </a>
        ))}
      </nav> */}
    </div>
  );
}
