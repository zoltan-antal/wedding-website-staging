import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import Loading from '../Loading/Loading';
import tentOutside from '../../assets/images/photos/tent-outside.jpg';
import tentInside from '../../assets/images/photos/tent-inside.jpg';
import town from '../../assets/images/photos/vac-close.jpg';
import './Accommodation.css';

const Accommodation = () => {
  const { guest, household, language, mainRef, navWidth } =
    useOutletContext<Context>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!guest || !household) {
      navigate('/login?redirectTo=/accommodation');
    }
  }, [guest, household, navigate]);

  if (!guest || !household) {
    return <Loading language={language} />;
  }

  return (
    <main
      ref={mainRef}
      style={{ width: `${navWidth}px` }}
      id="accommodation-page"
    >
      <h1>{{ English: 'Accommodation', Hungarian: 'Szállás' }[language]}</h1>
      <div>
        <img src={tentOutside} id="photo-tent-outside" />
        <div className="section" id="tent-intro">
          <p>
            {
              {
                English:
                  "Társa Pagony's on-site accommodation features a collection of glamping tents just a stone's throw away from the party. There's an illuminated gravel path leading to the tents from the Barn.",
                Hungarian:
                  'A Társa Pagony helyszíni szállását glamping sátrak adják, csupán egy kőhajításnyira a bulitól. Megvilágított kavicsos ösvény vezet a sátrakhoz a Pajtától.',
              }[language]
            }
          </p>
        </div>
        <img src={tentInside} id="photo-tent-inside" />
        <div className="section" id="tent-info">
          <p>
            {
              {
                English:
                  "The tents are fully kitted out with proper mattresses and bed linen, towels, rugs, power sockets and heaters. You'll also be provided an amenity kit for showering. We recommend you bring flip-flops or similar for trips to the bathroom.",
                Hungarian:
                  'A sátrak teljesen felszereltek rendes matracokkal, ágyneművel, törölközőkkel, szőnyeggel, konnektorokkal és fűtéssel. Ezenkívül a zuhanyzáshoz egy tisztálkodási csomaggal is ellátunk. Javasoljuk, hozz magaddal papucsot a mosdóhoz való eljutáshoz éjszaka.',
              }[language]
            }
          </p>
        </div>
        {household?.special && <img src={town} id="photo-town" />}
        {household?.special && (
          <div className="section" id="hotel">
            <p>
              <strong>
                {
                  {
                    English: 'Would you rather stay in a hotel?',
                    Hungarian: '',
                  }[language]
                }
              </strong>
              <br />
              {
                {
                  English:
                    "As the number of tents are limited, you'll also be offered the choice on the RSVP form to stay in a hotel in the nearby town of Vác (a 15-minute drive away). We'll have a shuttle running back to the hotel every hour on Saturday night. The choice of hotel will depend on guest numbers (details to follow after the RSVP deadline).",
                  Hungarian:
                    'Mivel a sátrak korlátozott számban elérhetőek, a visszajelzési űrlapon arra is van választási lehetőség, hogy egy közeli hotelben aludj Vácon (15 percre autóval). Szombat este óránkénti minibuszt biztosítunk majd a hotelhez. A konkrét hotel a vendégek végleges létszámától függ (részletek a visszajelzési határidő után).',
                }[language]
              }
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Accommodation;
