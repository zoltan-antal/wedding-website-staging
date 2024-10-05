import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import './index.css';

const Faq = () => {
  const { language } = useOutletContext<Context>();

  return (
    <main>
      <h1>
        {
          {
            English: 'Frequently Asked Questions',
            Hungarian: 'Gyakran ismételt kérdések',
          }[language]
        }
      </h1>
      {/* <div className="item">
        <h2>
          {
            {
              English: '',
              Hungarian: '',
            }[language]
          }
        </h2>
        <p>
          {
            {
              English: '',
              Hungarian: '',
            }[language]
          }
        </p>
      </div> */}
      <div className="item">
        <h2>
          {
            {
              English: 'Can I bring a plus one?',
              Hungarian: 'Hozhatok plusz egy embert?',
            }[language]
          }
        </h2>
        <p>
          {
            {
              English:
                "Invited guests are named on the invite envelope. Unfortunately, we're unable to accommodate any additional people.",
              Hungarian:
                'A meghívott vendégek neve a meghívó borítékján szerepel. További személyeket sajnos nem tudunk fogadni.',
            }[language]
          }
        </p>
      </div>
      <div className="item">
        <h2>
          {
            {
              English: 'Will the wedding be child-friendly?',
              Hungarian: 'Gyerekbarát lesz az esküvő?',
            }[language]
          }
        </h2>
        <p>
          {
            {
              English:
                "Due to the nature of the venue, we're unfortunately unable to accommodate children. However, they're more than welcome to join us at Balaton for the post-wedding wind-down. Thank you for your understanding.",
              Hungarian:
                'A helyszín jellegéből adódóan sajnos nem tudunk gyermekeket fogadni. Ugyanakkor szívesen látjuk őket az esküvő utáni Balatoni lazításon. Köszönjük a megértést.',
            }[language]
          }
        </p>
      </div>
      <div className="item">
        <h2>
          {
            {
              English: 'Will the wedding be indoors or outdoors?',
              Hungarian: 'Beltéren vagy kültéren lesz az esküvő?',
            }[language]
          }
        </h2>
        <p>
          {
            {
              English:
                "We're hoping to hold the ceremony outdoors (the area should be mostly shaded) and the reception indoors for the most part. Whilst many activities will be held inside, we encourage you to make the most of the beautiful outdoor spaces our venue has to offer! ",
              Hungarian:
                'A ceremónia a szabadban (viszonylag árnyékos részen), a fogadást nagyrészt beltéren tervezzük tartani. Bár számos tevékenység beltéren fog zajlani, javasoljuk, hogy használjátok ki a helyszín adta kültéri lehetőségeket is!',
            }[language]
          }
        </p>
      </div>
      {language === 'English' && (
        <div className="item">
          <h2>
            {
              {
                English: 'What weather should we plan for?',
              }[language]
            }
          </h2>
          <p>
            {
              {
                English:
                  'Generally, in Hungary, it is very warm in July, 25-35°C. However, as the venue is on a hillside, we might get some cooling winds. It will get chillier (15-25°C) after midnight, so it may be a good idea to bring a covering. In any case, be sure to check the weather forecast before your trip.',
              }[language]
            }
          </p>
        </div>
      )}
      <div className="item">
        <h2>
          {
            {
              English: "What's the plan in case of bad weather?",
              Hungarian: 'Rossz idő esetén mi a terv?',
            }[language]
          }
        </h2>
        <p>
          {
            {
              English:
                'In case of bad weather, we will move the ceremony inside.',
              Hungarian:
                'Rossz idő esetén a ceremónia beltéren lesz megtartva.',
            }[language]
          }
        </p>
      </div>
    </main>
  );
};

export default Faq;
