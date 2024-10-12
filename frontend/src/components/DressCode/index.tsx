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
              Hungarian:
                'Szeretnénk ha elegánsan, de mégis kényelmesen öltöznétek, ezért íme néhány tipp és némi inspiráció.',
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
            <h3>
              {
                {
                  English: 'Dress code: cocktail attire',
                  Hungarian: 'Dress code: koktélruha',
                }[language]
              }
            </h3>
            <ul>
              <li>
                {
                  {
                    English:
                      'Even though most of the inspiration pictures are dresses, feel free to wear trousers or a jumpsuit.',
                    Hungarian:
                      'Bár az inspirációs képek nagy része ruha, nyugodtan viselhetsz nadrágot vagy overált.',
                  }[language]
                }
              </li>
              <li>
                {
                  {
                    English:
                      'Due to the nature of the venue (gravel and grass), we recommend flat-soled shoes, or a wedge or platform if opting for heels.',
                    Hungarian:
                      'A helyszín jellegéből adódóan (kavics és fű) lapos- vagy telitalpú cipő viselését javasoljuk.',
                  }[language]
                }
              </li>
              <li>
                {
                  {
                    English: 'No white or black dresses etc. please.',
                    Hungarian: 'Kérjük, ne legyen fehér vagy fekete a ruhád.',
                  }[language]
                }
              </li>
              <li>
                {
                  {
                    English: 'No jeans, trainers or T-shirts please.',
                    Hungarian:
                      'Kérjük, ne jöjj farmerben, sportcipőben vagy pólóban.',
                  }[language]
                }
              </li>
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
            <h3>
              {
                {
                  English: 'Dress code: suit',
                  Hungarian: 'Dress code: öltöny',
                }[language]
              }
            </h3>
            <ul>
              {language === 'English' && (
                <li>
                  The formality we're envisioning ranges from business casual to
                  business formal.
                </li>
              )}
              <li>
                {
                  {
                    English:
                      "Even though we've said 'suit', an odd jacket/trouser combination is perfectly fine.",
                    Hungarian:
                      'Noha azt írtuk, "öltöny", eltérő zakó-nadrág párosítás is teljesen megfelelő.',
                  }[language]
                }
              </li>
              {language === 'English' && (
                <li>
                  As it's likely to be warm, you might want to opt for
                  lightweight fabrics.
                </li>
              )}
              <li>
                {
                  {
                    English:
                      'Ties are optional. If you do wear one, feel free to take it off, if it gets too hot.',
                    Hungarian:
                      'A nyakkendő opcionális. Ha abban jössz, nyugodtan vedd le, ha túl meleg van.',
                  }[language]
                }
              </li>
              <li>
                {
                  {
                    English: 'No black suits or ties please.',
                    Hungarian:
                      'Kérjük, ne legyen fekete az öltöny és a nyakkendő.',
                  }[language]
                }
              </li>
              <li>
                {
                  {
                    English: 'No jeans, trainers or T-shirts please.',
                    Hungarian:
                      'Kérjük, ne jöjj farmerben, sportcipőben vagy pólóban.',
                  }[language]
                }
              </li>
            </ul>
            <iframe src="https://petracoding.github.io/pinterest/board.html?link=bacon4120/wedding-dress-code-inspiration-gents/&hideHeader=1&transparent=1"></iframe>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DressCode;
