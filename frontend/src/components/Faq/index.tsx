import { useOutletContext, NavLink } from 'react-router-dom';
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
      <div className="items">
        <div className="item">
          <h2>
            {
              {
                English: 'Can I bring a plus one?',
                Hungarian: 'Hozhatok plusz egy embert?',
              }[language]
            }
          </h2>
          <div className="answer">
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
          <div className="answer">
            <p>
              {
                {
                  English:
                    "Due to the nature of the venue, we're unfortunately unable to accommodate children. However, they're more than welcome to join us at Balaton for the post-wedding wind-down. Thank you for your understanding.",
                  Hungarian:
                    'A helyszín jellegéből adódóan sajnos nem tudunk gyerekeket fogadni. Ugyanakkor szívesen látjuk őket az esküvő utáni Balatoni lazításon. Köszönjük a megértést.',
                }[language]
              }
            </p>
          </div>
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
          <div className="answer">
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
            <div className="answer">
              <p>
                {
                  {
                    English:
                      'Generally, in Hungary, it is very warm in July, 25-35°C. However, as the venue is on a hillside, we might get some cooling winds. It will get chillier (15-25°C) after midnight, so it may be a good idea to bring a covering. In any case, be sure to check the weather forecast before your trip.',
                  }[language]
                }
              </p>
            </div>
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
          <div className="answer">
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
        </div>
        <div className="item">
          <h2>
            {
              {
                English: 'What kind of food will be served?',
                Hungarian: 'Milyen ételek lesznek?',
              }[language]
            }
          </h2>
          <div className="answer">
            <p>
              {
                {
                  English:
                    'Dinner will be buffet-style with lots of different options (mainly continental and Mediterranean dishes). There will also be nibbles before and after the ceremony, as well as a midnight meal, a Hungarian tradition!',
                  Hungarian:
                    'A vacsora svédasztalos lesz, sokféle választási lehetőséggel (főként kontinentális és mediterrán ételekkel). A ceremónia előtt és után is lesz harapnivaló, valamint lesz éjféli menü is.',
                }[language]
              }
            </p>
            <p>
              {
                {
                  English:
                    'You can indicate dietary requirements on the RSVP form.',
                  Hungarian:
                    'Speciális étkezési igényt a visszajelzési űrlapon tudtok jelezni.',
                }[language]
              }
            </p>
          </div>
        </div>
        <div className="item">
          <h2>
            {
              {
                English: 'What about drinks?',
                Hungarian: 'Mi a helyzet az italokkal?',
              }[language]
            }
          </h2>
          <div className="answer">
            <p>
              {
                {
                  English:
                    "There will be an open bar throughout the day, with a selection of soft drinks, beer & wine. Please don't bring your own drinks.",
                  Hungarian:
                    'Korlátlan italfogyasztást biztosítunk a nap során, üdítőitalok, sör és bor választékával. Kérjük, ne hozzatok magatokkal saját italt.',
                }[language]
              }
            </p>
          </div>
        </div>
        <div className="item">
          <h2>
            {
              {
                English: 'Can I take photos during the day?',
                Hungarian: 'Szabad fényképezni?',
              }[language]
            }
          </h2>
          <div className="answer">
            <p>
              {
                {
                  English:
                    'We would absolutely love to see our wedding through your eyes and any moments you capture! However, please put your phones & cameras away for the ceremony. Please also refrain from sharing any photos on social media until the day after the wedding.',
                  Hungarian:
                    'Szívesen megnézzük az általatok megörökített pillanatokat is az esküvőnkről! Kérjük azonban, hogy a szertartás idejére tegyétek el a telefonjaikat és kameráitokat. Kérjük, hogy az esküvőt követő napig ne osszátok meg képeiteket közösségi médiában.',
                }[language]
              }
            </p>
            <p>
              {
                {
                  English:
                    'As we will have a professional photographer and videographer, please be aware that the event will be recorded.',
                  Hungarian:
                    'Mivel profi fotós és videós lesz jelen, az eseményt rögzítésre fog kerülni.',
                }[language]
              }
            </p>
          </div>
        </div>
        <div className="item">
          <h2>
            {
              {
                English: 'What language will the day be in?',
                Hungarian: 'Milyen nyelven lesz az esküvő?',
              }[language]
            }
          </h2>
          <div className="answer">
            <p>
              {
                {
                  English:
                    "English and Hungarian aren't the most mutually intelligible languages, so we understand the potential apprehension! We will do all we can to ensure that everyone understands what's going on, and we'll also make sure that people who can speak both languages are known to you.",
                  Hungarian:
                    'Mindent megteszünk annak az érdekében, hogy mindenki mindent értsen.',
                }[language]
              }
            </p>
          </div>
        </div>
        <div className="item">
          <h2>
            {
              {
                English: 'Do you have a gift registry?',
                Hungarian: 'Milyen ajándékot hozzak?',
              }[language]
            }
          </h2>
          <div className="answer">
            <p>
              {
                {
                  English:
                    "Thank you for considering getting us a gift! We're working on a list, and will notify everyone when it's available.",
                  Hungarian:
                    'Köszönjük, hogy gondolkodol ajándékon. Dolgozunk egy ajándéklistán, és mindenkit értesítünk majd, amint kész van.',
                }[language]
              }
            </p>
          </div>
        </div>
        <div className="item">
          <h2>
            {
              {
                English: "I have a question that's not been covered here.",
                Hungarian: 'Más kérdésem van',
              }[language]
            }
          </h2>
          <div className="answer">
            <p>
              {
                {
                  English:
                    'Each page of the website includes further information on specific aspects.',
                  Hungarian:
                    'A weboldal aloldalai részletes információkkal szolgálnak az egyes szempontokról.',
                }[language]
              }
            </p>
            <p>
              {
                {
                  English:
                    "If your question still hasn't been answered, please ",
                  Hungarian:
                    'Ha ennek ellenére továbbra is megválaszolatlan a kérdésed, kérjük ',
                }[language]
              }
              <NavLink to="/contact">
                {
                  {
                    English: 'contact us',
                    Hungarian: 'vedd fel velünk a kapcsolatot',
                  }[language]
                }
              </NavLink>
              {
                {
                  English: " and we'll get back to you shortly.",
                  Hungarian: ', és rövid időn belül válaszolunk.',
                }[language]
              }
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Faq;
