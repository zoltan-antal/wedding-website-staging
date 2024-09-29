import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import RsvpForm from './RsvpForm';

const Rsvp = () => {
  const { guest, household } = useOutletContext<Context>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!guest || !household) {
      navigate('/login');
    }
  }, [guest, household, navigate]);

  return (
    <main>
      <h1>RSVP</h1>
      <RsvpForm></RsvpForm>
    </main>
  );
};

export default Rsvp;
