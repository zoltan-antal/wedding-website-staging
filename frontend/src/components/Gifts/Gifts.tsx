import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
// import Loading from '../Loading/Loading';
// import GiftList from './GiftList';
import './Gifts.css';

const Gifts = () => {
  const { /* isInitialised, guest, household, */ language, mainRef, navWidth } =
    useOutletContext<Context>();
  // const [claiming, setClaiming] = useState(false);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isInitialised && (!guest || !household)) {
  //     navigate('/login?redirectTo=/registry');
  //   }
  // }, [isInitialised, guest, household, navigate]);

  // if (!isInitialised) {
  //   return <Loading language={language} />;
  // }

  return (
    <main
      ref={mainRef}
      style={{ width: `${navWidth}px` }}
      id="registry-page"
      // className={claiming ? 'claiming' : ''}
    >
      <h1>
        {
          {
            English: 'Gifts',
            Hungarian: 'Ajándékozás',
          }[language]
        }
      </h1>
      <p>
        {
          {
            English:
              "Since we've been living together for a long time, we already have most household items that we need for where we live now. Because of this, there's not much we could put on a gift list. As we'll be looking to move to a new place in the near future, we're asking for monetary gifts, which will go towards making our new place home.",
            Hungarian:
              'Mivel már régóta együtt élünk, a mostani lakásunkhoz szükséges háztartási eszközök nagy részével már rendelkezünk, így nem sok mindent tudnánk egy ajándéklistára tenni. Viszont a közeljövőben új helyre szeretnénk költözni, ezért inkább pénzbeli ajándékot kérnénk, amit az új otthonunk berendezésére fogunk fordítani.',
          }[language]
        }
      </p>
      {language === 'Hungarian' && (
        <p>
          Többen kérdeztétek, hogy lesz-e menyasszonytánc. Nem tervezünk – így
          ha terveztél erre szánni, kérjük ezt ezt az összeget inkább az
          ajándékhoz tedd hozzá.
        </p>
      )}
      <p>
        {
          {
            English:
              'In the email sent about gifting, you can find our bank account details if you prefer bank transfer instead of cash.',
            Hungarian:
              'Az ajándékozásról szóló e-mailben megtalálod a bankszámlaszámunkat is, ha kézpénz helyett inkább az átutalást preferálnád.',
          }[language]
        }
      </p>
      <p>
        {
          {
            English:
              "If you'd still much rather give a physical gift, please let us know, and we'll try our best to give you some ideas.",
            Hungarian:
              'Ha mégis mindenképpen kézzel fogható ajándékot szeretnél adni, kérjük szólj, és megpróbálunk adni pár ötletet.',
          }[language]
        }
      </p>
      {/* <GiftList claiming={claiming} setClaiming={setClaiming} /> */}
    </main>
  );
};

export default Gifts;
