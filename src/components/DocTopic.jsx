import { useEffect } from 'react';

import DocTopicHeader from './DocTopicHeader';

export default function DocTopic() {
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setActiveSection(entry.target.id);
  //         }
  //       });
  //     },
  //     { rootMargin: '0px 0px -80% 0px' }
  //   );

  //   document.querySelectorAll('h2[id], h3[id]').forEach((section) => {
  //     observer.observe(section);
  //   });

  //   return () => observer.disconnect();
  // }, []);

  return (
    <div className="pt-12">
      <DocTopicHeader title="Introduction" category="Getting Started" />
    </div>
  );
}
