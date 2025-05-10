import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import Loading from '../Loading/Loading';
import GiftList from './GiftList';
import './Registry.css';

const Registry = () => {
  const { isInitialised, guest, household, language, mainRef, navWidth } =
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
    <main
      ref={mainRef}
      style={{ width: `${navWidth}px` }}
      id="registry-page"
      className={claiming ? 'claiming' : ''}
    >
      <h1>
        {
          {
            English: 'Gift registry',
            Hungarian: 'Ajándéklista',
          }[language]
        }
      </h1>
      <p>
        {
          {
            English:
              "As we've been living together for a long time, we already have most household items that people usually ask for as wedding gifts, so our gift list isn't very long. If you'd prefer — or if the item you wanted to gift has already been reserved by someone else — you're also welcome to gift us money, which we will put towards our honeymoon.",
            Hungarian:
              'Mivel már régóta együtt élünk, szinte már minden háztartási eszközünk megvan, amit általában ajándékba szoktak kérni, ezért az ajándéklistánk nem túl hosszú. Ha úgy preferálod, — vagy ha az általad kiszemelt ajándék már le van foglalva — pénzt is ajándékozhatsz: ezt a nászutunkra tervezzük költeni.',
          }[language]
        }
      </p>
      <p>
        {
          {
            English:
              'In the email sent about the gift registry, you can find the delivery address for the gifts and bank account details if you wish to transfer a monetary gift.',
            Hungarian:
              'Az ajándéklistáról szóló e-mailben megtalálod a szállítási címet az ajándékokhoz és a bankszámlaszámunkat (arra az esetre, ha átutalással szeretnél pénzbeli ajándékot adni).',
          }[language]
        }
      </p>
      <GiftList claiming={claiming} setClaiming={setClaiming} />
    </main>
  );
};

export default Registry;
