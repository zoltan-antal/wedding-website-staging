import { useOutletContext } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Context } from '../../types/context';

const AlreadySubmitted = () => {
  const { household, language } = useOutletContext<Context>();
  const rsvpSubmissions = household?.rsvps.toSorted((a, b) => {
    return a.createdAt < b.createdAt ? -1 : 1;
  });
  const mostRecentRsvpSubmission =
    rsvpSubmissions![rsvpSubmissions!.length - 1];

  return (
    <div>
      <h2>
        {
          {
            English: `We already have an RSVP from you.`,
            Hungarian: `Már kaptunk ${
              household!.guests.length > 1 ? 'tőletek' : 'tőled'
            } visszajelzést.`,
          }[language]
        }
        <br></br>
        {
          {
            English: `Thank you!`,
            Hungarian: `Köszönjük!`,
          }[language]
        }
      </h2>
      <div className="submission-details">
        <h3>
          {
            { English: 'Submission details', Hungarian: 'Beküldési adatok' }[
              language
            ]
          }
        </h3>
        <div>
          {(() => {
            const submitter = household?.guests.find(
              (guest) => guest.id === mostRecentRsvpSubmission.guestId
            );
            if (!submitter) return null;
            return (
              <p>
                {
                  {
                    English: 'Form submitted by',
                    Hungarian: 'Az űrlapot beküldte',
                  }[language]
                }
                {': '}
                {
                  {
                    English: `${submitter.firstName} ${submitter.lastName}`,
                    Hungarian: `${submitter.lastName} ${submitter.firstName}`,
                  }[language]
                }
              </p>
            );
          })()}
          <p>
            {
              { English: 'Submitted at', Hungarian: 'Beküldés időpontja' }[
                language
              ]
            }
            {': '}
            {(() => {
              const submissionDate = new Date(
                mostRecentRsvpSubmission.createdAt
              );
              return submissionDate.toLocaleString();
            })()}
          </p>
        </div>
      </div>
      <div className="change-rsvp">
        <h3>
          {
            {
              English: 'If something has changed, please contact us',
              Hungarian: `Ha ${(() => {
                if (!household) return 'szeretnél';
                return household.guests.length > 1
                  ? 'szeretnétek'
                  : 'szeretnél';
              })()} változtatni az elküldötteken, kérjük, ${(() => {
                if (!household) return 'lépj';
                return household.guests.length > 1 ? 'lépjetek' : 'lépj';
              })()} velünk kapcsolatba`,
            }[language]
          }
          {':'}
        </h3>
        <NavLink to="/contact">
          {
            {
              English: 'Contact',
              Hungarian: 'Kapcsolat',
            }[language]
          }
        </NavLink>
      </div>
    </div>
  );
};

export default AlreadySubmitted;
