import { useOutletContext, NavLink } from 'react-router-dom';
import { Context } from '../../types/context';
import './indec.css';

const Contact = () => {
  const { language, mainRef, navWidth } = useOutletContext<Context>();

  return (
    <main ref={mainRef} style={{ width: `${navWidth}px` }} id="contact-page">
      <h1>{{ English: 'Contact', Hungarian: 'Kapcsolat' }[language]}</h1>
      <div>
        <p>
          {
            {
              English: 'Please RSVP by using the',
              Hungarian: 'Kérjük, részvételi visszajelzésre használd a',
            }[language]
          }{' '}
          <NavLink to={'/rsvp'}>
            {
              {
                English: 'RSVP form',
                Hungarian: 'visszajelzés űrlapot',
              }[language]
            }
          </NavLink>
          {'.'}
        </p>
        <p>
          {
            {
              English:
                'If you have any questions about the day, any arrangements or the lead-up and post-wedding period, check out the relevant pages and the',
              Hungarian:
                'Ha bármilyen kérdésed van a esküvővel, az előkészületekkel vagy az esküvő előtti és utáni időszakkal kapcsolatban, kérjük tekintsd át a releváns oldalakat és a',
            }[language]
          }{' '}
          <NavLink to={'/faq'}>
            {
              {
                English: 'FAQ page',
                Hungarian: 'gyakran ismételt kérdések oldalt',
              }[language]
            }
          </NavLink>
          {'.'}
        </p>
        <p>
          {' '}
          {
            {
              English:
                'If you still need to contact us, you can reach us via email at',
              Hungarian:
                'Ha szeretnéd felvenni velünk a kapcsolatot, kérjük, írj az alábbi e-mail címre:',
            }[language]
          }
          <br />
          <NavLink to={'mailto:info@ellazoltan.com'} id="email">
            info@ellazoltan.com
          </NavLink>
        </p>
      </div>
    </main>
  );
};

export default Contact;
