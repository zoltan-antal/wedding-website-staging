import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import './index.css';

const DressCode = () => {
  const { language, mainRef, navWidth } = useOutletContext<Context>();

  return (
    <main ref={mainRef} style={{ width: `${navWidth}px` }} id="dress-code-page">
      <h1>
        {
          {
            English: 'Dress code',
            Hungarian: 'Dress code',
          }[language]
        }
      </h1>
    </main>
  );
};

export default DressCode;
