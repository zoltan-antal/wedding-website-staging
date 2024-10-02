import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import RsvpForm from './RsvpForm';
import AlreadySubmitted from './AlreadySubmitted';

const Rsvp = () => {
  const { guest, household, language } = useOutletContext<Context>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!guest || !household) {
      navigate('/login?redirectTo=/rsvp');
    }
  }, [guest, household, navigate]);

  return (
    <main>
      <h1>
        {
          {
            English: 'RSVP',
            Hungarian: 'Visszajelzés',
          }[language]
        }
      </h1>
      {!!household?.rsvps.length && <AlreadySubmitted></AlreadySubmitted>}
      {!household?.rsvps.length && <RsvpForm></RsvpForm>}
    </main>
  );
};

export default Rsvp;
