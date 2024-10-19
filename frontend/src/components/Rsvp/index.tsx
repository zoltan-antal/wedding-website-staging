import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import Loading from '../Loading/Loading';
import RsvpForm from './RsvpForm';
import AlreadySubmitted from './AlreadySubmitted';
import './index.css';

const Rsvp = () => {
  const { guest, household, language } = useOutletContext<Context>();
  const currentDate = new Date();
  const deadlineDate = new Date('2025-01-16T00:00:00.000Z');

  const navigate = useNavigate();

  useEffect(() => {
    if (!guest || !household) {
      navigate('/login?redirectTo=/rsvp');
    }
  }, [guest, household, navigate]);

  if (!guest || !household) {
    return <Loading language={language} />;
  }

  return (
    <main id="rsvp-page">
      <h1>
        {
          {
            English: 'RSVP',
            Hungarian: 'Visszajelzés',
          }[language]
        }
      </h1>
      {!household?.rsvps.length && currentDate < deadlineDate && (
        <RsvpForm></RsvpForm>
      )}
      {!!household?.rsvps.length && <AlreadySubmitted></AlreadySubmitted>}
      {!household?.rsvps.length && currentDate > deadlineDate && (
        <h2>
          {
            {
              English: 'The RSVP deadline has passed',
              Hungarian: 'A visszajelzési határidő lejárt',
            }[language]
          }
        </h2>
      )}
    </main>
  );
};

export default Rsvp;
