import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import './index.css';

const Schedule = () => {
  const { language, mainRef, navWidth } = useOutletContext<Context>();

  return (
    <main ref={mainRef} style={{ width: `${navWidth}px` }} id="schedule-page">
      <h1>
        {
          {
            English: 'Schedule',
            Hungarian: 'Program',
          }[language]
        }
      </h1>
    </main>
  );
};

export default Schedule;
