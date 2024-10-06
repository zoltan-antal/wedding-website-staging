import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';

const ResetPassword = () => {
  const { language } = useOutletContext<Context>();

  return (
    <main>
      <h1>
        {
          {
            English: 'Reset password',
            Hungarian: 'Jelszó visszaállítása',
          }[language]
        }
      </h1>
      <p>
        {
          {
            English:
              "If you've forgotten your password, please email us and we will reset it:",
            Hungarian:
              'Ha eljelejtetted a jelszavad, írj nekünk egy e-mailt, és alaphelyzetbe állítjuk:',
          }[language]
        }
      </p>
      <a
        href={
          {
            English: 'mailto:info@elllazoltan.com?subject=Forgotten%20password',
            Hungarian:
              'mailto:info@elllazoltan.com?subject=Elfelejtett%20jelsz%C3%B3',
          }[language]
        }
      >
        info@ellazoltan.com
      </a>
    </main>
  );
};

export default ResetPassword;
