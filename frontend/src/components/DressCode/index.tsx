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
      <div>
        <p>
          {
            {
              English:
                "We would like you to dress up but also be comfortable, so here's some tips and inspiration.",
              Hungarian: '',
            }[language]
          }
        </p>
        <div id="genders">
          <div className="gender">
            <h2>
              {
                {
                  English: 'Ladies',
                  Hungarian: 'Hölgyek',
                }[language]
              }
            </h2>
            <h3>Dress code: cocktail attire</h3>
            <ul>
              <li>
                Even though most of the inspiration pictures are dresses, feel
                free to wear trousers or a jumpsuit.
              </li>
              <li>
                Due to the nature of the venue (gravel and grass), we recommend
                flat-soled shoes, or a wedge or platform if opting for heels.
              </li>
              <li>No white or black dresses etc. please.</li>
              <li>No jeans, trainers or T-shirts please.</li>
            </ul>
            <iframe src="https://petracoding.github.io/pinterest/board.html?link=bacon4120/wedding-dress-code-inspiration-ladies/&hideHeader=1&transparent=1"></iframe>
          </div>
          <div className="gender">
            <h2>
              {
                {
                  English: 'Gents',
                  Hungarian: 'Urak',
                }[language]
              }
            </h2>
            <h3>Dress code: suit</h3>
            <ul>
              <li>
                The formality we're envisioning ranges from business casual to
                business formal.
              </li>
              <li>
                Even though we've said 'suit', an odd jacket/trouser combination
                is perfectly fine.
              </li>
              <li>
                As it's likely to be warm, you might want to opt for lightweight
                fabrics.
              </li>
              <li>
                Ties are optional. If you do wear one, feel free to take it off
                if it gets too hot.
              </li>
              <li>No black suits or ties please.</li>
              <li>No jeans, trainers or T-shirts please.</li>
            </ul>
            <iframe src="https://petracoding.github.io/pinterest/board.html?link=bacon4120/wedding-dress-code-inspiration-gents/&hideHeader=1&transparent=1"></iframe>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DressCode;
