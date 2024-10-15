import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import './index.css';

interface Event {
  time: string;
  text: string;
}

interface DayEvents {
  day: string;
  events: Event[];
}

const Schedule = () => {
  const { language, mainRef, navWidth } = useOutletContext<Context>();

  const timelineData: DayEvents[] = [
    {
      day: { English: 'Friday', Hungarian: 'Péntek' }[language],
      events: [
        {
          time: { English: 'afternoon', Hungarian: 'délután' }[language],
          text:
            { English: 'Meet & Greet', Hungarian: 'Ismerkedős délután' }[
              language
            ] + ' 🙋',
        },
      ],
    },
    {
      day: { English: 'Saturday', Hungarian: 'Szombat' }[language],
      events: [
        {
          time: { English: 'afternoon', Hungarian: 'délután' }[language],
          text:
            {
              English: 'Arrival to venue',
              Hungarian: 'Érkezés a helyszínre',
            }[language] + ' 🚗',
        },
        {
          time: { English: 'afternoon', Hungarian: 'délután' }[language],
          text:
            {
              English: 'Ceremony',
              Hungarian: 'Ceremónia',
            }[language] + ' 💍',
        },
        {
          time: { English: 'evening', Hungarian: 'este' }[language],
          text:
            {
              English: 'Dinner',
              Hungarian: 'Vacsora',
            }[language] + ' 🍽️',
        },
        {
          time: { English: 'evening', Hungarian: 'este' }[language],
          text:
            {
              English: 'Cake',
              Hungarian: 'Torta',
            }[language] + ' 🍰',
        },
        {
          time: { English: 'evening', Hungarian: 'este' }[language],
          text:
            {
              English: 'Party',
              Hungarian: 'Buli',
            }[language] + ' 🎉',
        },
        {
          time: { English: '12pm', Hungarian: '00:00' }[language],
          text:
            {
              English: 'Midnight buffet',
              Hungarian: 'Éjféli büfé',
            }[language] + ' 🍕',
        },
      ],
    },
    {
      day: { English: 'Sunday', Hungarian: 'Vasárnap' }[language],
      events: [
        {
          time: { English: 'morning', Hungarian: 'reggel' }[language],
          text:
            { English: 'Breakfast', Hungarian: 'Reggeli' }[language] + ' 🥐',
        },
        {
          time: { English: 'by 2pm', Hungarian: '14:00-ig' }[language],
          text:
            { English: 'Leave venue', Hungarian: 'Helyszín elhagyása' }[
              language
            ] + ' 🚗',
        },
      ],
    },
    {
      day: { English: 'Monday - Tuesday', Hungarian: 'Hétfő - kedd' }[language],
      events: [
        {
          time: { English: 'all day', Hungarian: 'egész nap' }[language],
          text:
            {
              English: 'Post-wedding wind-down',
              Hungarian: 'Esküvő utáni lazulás',
            }[language] + ' 🏖️',
        },
      ],
    },
  ];

  return (
    <main ref={mainRef} style={{ width: `${navWidth}px` }} id="schedule-page">
      <h1>
        {
          {
            English: 'Schedule',
            Hungarian: 'Program',
          }[language]
        }
      </h1>
      <p className="remark">
        {
          {
            English: 'More detail and exact times to follow',
            Hungarian: 'További részletek és pontos időpontok hamarosan',
          }[language]
        }
      </p>
      <div className="timeline">
        {timelineData.map((dayData, dayIndex) => (
          <div key={dayIndex} className="day-section">
            <h3 className="day-title">{dayData.day}</h3>
            {dayData.events.map((event, index) => (
              <div className="timeline-item" key={index}>
                <div className="time-label">{event.time}</div>
                <div className="timeline-content">{event.text}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Schedule;
