import { useOutletContext } from 'react-router-dom';
import { Context } from '../types/context';

function NotFound() {
  const { language } = useOutletContext<Context>();

  return (
    <main>
      <h1>
        {
          {
            English: 'Oops!',
            Hungarian: 'Hoppá!',
          }[language]
        }
      </h1>
      <p>
        {
          {
            English: "This page doesn't exist.",
            Hungarian: 'Ez az oldal nem található.',
          }[language]
        }
      </p>
    </main>
  );
}

export default NotFound;
