import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import Loading from '../Loading/Loading';
import GiftList from './GiftList';
import './Registry.css';

const Registry = () => {
  const { isInitialised, guest, household, language } =
    useOutletContext<Context>();

  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialised && (!guest || !household)) {
      navigate('/login?redirectTo=/registry');
    }
  }, [isInitialised, guest, household, navigate]);

  if (!isInitialised) {
    return <Loading language={language} />;
  }

  return (
    <main id="registry-page">
      <h1>
        {
          {
            English: 'Wedding registry',
            Hungarian: 'Ajándéklista',
          }[language]
        }
      </h1>
      <GiftList />
    </main>
  );
};

export default Registry;
