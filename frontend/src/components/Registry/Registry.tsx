import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import Loading from '../Loading/Loading';
import GiftList from './GiftList';
import './Registry.css';

const Registry = () => {
  const { isInitialised, guest, household, language } =
    useOutletContext<Context>();
  const [claiming, setClaiming] = useState(false);

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
    <main id="registry-page" className={claiming ? 'claiming' : ''}>
      <h1>
        {
          {
            English: 'Gift registry',
            Hungarian: 'Ajándéklista',
          }[language]
        }
      </h1>
      <GiftList claiming={claiming} setClaiming={setClaiming} />
    </main>
  );
};

export default Registry;
