import { Language } from '../../types/language';

interface LoadingPageProps {
  language: Language;
}

const Loading = ({ language }: LoadingPageProps) => {
  return (
    <main id="loading-page">
      <p>
        {
          {
            English: 'Loading page...',
            Hungarian: 'Oldal betöltése folyamatban...',
          }[language]
        }
      </p>
    </main>
  );
};

export default Loading;
