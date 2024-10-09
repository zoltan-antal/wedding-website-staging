import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import tentOutside from '../../assets/images/photos/tent-outside.jpg';
import tentInside from '../../assets/images/photos/tent-inside.jpg';
import town from '../../assets/images/photos/vac-close.jpg';
import './index.css';

const Accommodation = () => {
  const { guest, household, language, mainRef, navWidth } =
    useOutletContext<Context>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!guest || !household) {
      navigate('/login?redirectTo=/accommodation');
    }
  }, [guest, household, navigate]);

  return (
    <main
      ref={mainRef}
      style={{ width: `${navWidth}px` }}
      id="accommodation-page"
    >
      <h1>{{ English: 'Accommodation', Hungarian: 'Szállás' }[language]}</h1>
      <div>
        <p id="tent-intro">
          {
            {
              English:
                "Társa Pagony's on-site accommodation features a collection of glamping tents just a stone's throw away from the party. There's an illuminated gravel path leading to the tents from the Barn.",
              Hungarian: '',
            }[language]
          }
        </p>
        <p id="tent-info">
          {
            {
              English:
                "The tents are fully kitted out with proper mattresses and bed linen, towels, rugs, power sockets and heaters. You'll also be provided an amenity kit for showering. We recommend you bring flip-flops or similar for trips to the bathroom.",
              Hungarian: '',
            }[language]
          }
        </p>
        {household?.special && (
          <p id="hotel">
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
                Hungarian: '',
              }[language]
            }
          </p>
        )}
        <img src={tentOutside} id="photo-tent-outside" />
        <img src={tentInside} id="photo-tent-inside" />
        {household?.special && <img src={town} id="photo-town" />}
      </div>
    </main>
  );
};

export default Accommodation;
