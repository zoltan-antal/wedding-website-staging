import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import './index.css';

const Travel = () => {
  const { language, mainRef, navWidth } = useOutletContext<Context>();

  return (
    <main ref={mainRef} style={{ width: `${navWidth}px` }} id="travel-page">
      <h1>
        {
          {
            English: 'Travel',
            Hungarian: 'Érkezés',
          }[language]
        }
      </h1>
    </main>
  );
};

export default Travel;
