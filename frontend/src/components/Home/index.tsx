import { useOutletContext, NavLink } from 'react-router-dom';
import { Context } from '../../types/context';
import Countdown from './Countdown';
import './index.css';

const Home = () => {
  const { language, mainRef, navWidth } = useOutletContext<Context>();
  const currentDate = new Date();
  const deadlineDate = new Date('2025-01-16T00:00:00.000Z');

  return (
    <main ref={mainRef} style={{ width: `${navWidth}px` }} id="home-page">
      <Countdown></Countdown>
      <div id="rsvp">
        {currentDate < deadlineDate && (
          <>
            <p>
              {
                {
                  English: "Let us know if you're coming!",
                  Hungarian: 'Reméljük, el tudsz jönni!',
                }[language]
              }
              <br />
              {
                {
                  English: 'Please',
                  Hungarian: 'Kérjük,',
                }[language]
              }
            </p>
            <NavLink to={'/rsvp'}>
              {{ English: 'RSVP', Hungarian: 'Jelezz vissza' }[language]}
            </NavLink>
            <p>
              {
                { English: 'by 15th January', Hungarian: 'január 15-ig' }[
                  language
                ]
              }
            </p>
          </>
        )}
        {currentDate >= deadlineDate && (
          <>
            <p>
              {
                {
                  English: 'The RSVP deadline has passed.',
                  Hungarian: 'A visszajelzési határidő lejárt.',
                }[language]
              }
            </p>
            <p>
              {
                {
                  English: 'See you in July!',
                  Hungarian: 'Találkozunk júliusban!',
                }[language]
              }
            </p>
          </>
        )}
      </div>
      <div id="faq">
        <p>
          {{ English: 'Have questions?', Hungarian: 'Kérdésed van?' }[language]}
          <br />
          {{ English: 'Check out our', Hungarian: 'Tekintsd meg' }[language]}
        </p>
        <NavLink to={'/faq'}>
          {{ English: 'FAQ', Hungarian: 'gyakran ismételt kérdések' }[language]}
        </NavLink>
        <p>{{ English: 'page', Hungarian: 'oldalunkat' }[language]}</p>
      </div>
      <div id="venue">
        <p>
          {
            {
              English: 'Get a sneak peek of our beautiful',
              Hungarian: 'Tekintsd meg, milyen lesz a',
            }[language]
          }
        </p>
        <NavLink to={'/venue'}>
          {{ English: 'Venue', Hungarian: 'Helyszín' }[language]}
        </NavLink>
      </div>
      <div id="accommodation">
        <p>
          {
            {
              English: "Find out about where you'll be staying:",
              Hungarian: 'Nézd meg, hol lehet aludni:',
            }[language]
          }
        </p>
        <NavLink to={'/accommodation'}>
          {{ English: 'Accommodation', Hungarian: 'Szállás' }[language]}
        </NavLink>
      </div>
      <div id="travel">
        <p>
          {
            {
              English: 'All you need to know about getting there:',
              Hungarian: 'Minden, amit az odajutásról tudnod kell:',
            }[language]
          }
        </p>
        <NavLink to={'/travel'}>
          {{ English: 'Travel', Hungarian: 'Érkezés' }[language]}
        </NavLink>
      </div>
      <div id="schedule">
        <p>
          {
            {
              English: 'For a rundown of the days, check out the',
              Hungarian: 'Nézd meg a pontos menetrendet:',
            }[language]
          }
        </p>
        <NavLink to={'/schedule'}>
          {{ English: 'Schedule', Hungarian: 'Program' }[language]}
        </NavLink>
      </div>
    </main>
  );
};

export default Home;
