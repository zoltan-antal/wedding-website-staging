import { useState, useEffect } from 'react';
import { fromZonedTime } from 'date-fns-tz';
import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';

interface TimeLeft {
  timeUntilStartTime: number;
  daysUntilStartTime: number;
  hoursUntilStartTime: number;
  minutesUntilStartTime: number;
  secondsUntilStartTime: number;
  timeSinceEndTime: number;
  daysSinceEndTime: number;
  hoursSinceEndTime: number;
  minutesSinceEndTime: number;
  secondsSinceEndTime: number;
}

const Countdown = () => {
  const { language } = useOutletContext<Context>();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div id="countdown">
      {(() => {
        if (timeLeft.timeUntilStartTime > 0) {
          return (
            <>
              <div id="days">
                <p className="number">{timeLeft.daysUntilStartTime}</p>
                <p>
                  {
                    {
                      English: `${
                        timeLeft.daysUntilStartTime === 1 ? 'day' : 'days'
                      }`,
                      Hungarian: 'nap',
                    }[language]
                  }
                </p>
              </div>
              <div id="hours">
                <p className="number">{timeLeft.hoursUntilStartTime}</p>
                <p>
                  {
                    {
                      English: `${
                        timeLeft.hoursUntilStartTime === 1 ? 'hour' : 'hours'
                      }`,
                      Hungarian: 'óra',
                    }[language]
                  }
                </p>
              </div>
              <div id="minutes">
                <p className="number">{timeLeft.minutesUntilStartTime}</p>
                <p>
                  {
                    {
                      English: `${
                        timeLeft.minutesUntilStartTime === 1
                          ? 'minute'
                          : 'minutes'
                      }`,
                      Hungarian: 'perc',
                    }[language]
                  }
                </p>
              </div>
              <div id="seconds">
                <p className="number">{timeLeft.secondsUntilStartTime}</p>
                <p>
                  {
                    {
                      English: `${
                        timeLeft.secondsUntilStartTime === 1
                          ? 'second'
                          : 'seconds'
                      }`,
                      Hungarian: 'másodperc',
                    }[language]
                  }
                </p>
              </div>
              <h2>
                {{ English: 'to go!', Hungarian: 'az esküvőig!' }[language]}
              </h2>
            </>
          );
        } else if (timeLeft.timeSinceEndTime < 0) {
          return (
            <h1>
              {
                {
                  English: "It's the big day! 🎉",
                  Hungarian: 'Ma van a nagy nap! 🎉',
                }[language]
              }
            </h1>
          );
        } else {
          return (
            <>
              <h2>
                {
                  {
                    English: "We've been married for",
                    Hungarian: 'Házasok vagyunk',
                  }[language]
                }
              </h2>
              <div id="days">
                <p className="number">{timeLeft.daysSinceEndTime}</p>
                <p>
                  {
                    {
                      English: `${
                        timeLeft.daysSinceEndTime === 1 ? 'day' : 'days'
                      }`,
                      Hungarian: 'napja',
                    }[language]
                  }
                </p>
              </div>
              <div id="hours">
                <p className="number">{timeLeft.hoursSinceEndTime}</p>
                <p>
                  {
                    {
                      English: `${
                        timeLeft.hoursSinceEndTime === 1 ? 'hour' : 'hours'
                      }`,
                      Hungarian: 'órája',
                    }[language]
                  }
                </p>
              </div>
              <div id="minutes">
                <p className="number">{timeLeft.minutesSinceEndTime}</p>
                <p>
                  {
                    {
                      English: `${
                        timeLeft.minutesSinceEndTime === 1
                          ? 'minute'
                          : 'minutes'
                      }`,
                      Hungarian: 'perce',
                    }[language]
                  }
                </p>
              </div>
              <div id="seconds">
                <p id="and">{{ English: 'and', Hungarian: 'és' }[language]}</p>
                <p className="number">{timeLeft.secondsSinceEndTime}</p>
                <p>
                  {
                    {
                      English: `${
                        timeLeft.secondsSinceEndTime === 1
                          ? 'second'
                          : 'seconds'
                      }`,
                      Hungarian: 'másodperce',
                    }[language]
                  }
                </p>
              </div>
            </>
          );
        }
      })()}
    </div>
  );
};

const startTimeDateTime = fromZonedTime(
  '2025-07-19T00:00:00',
  'Europe/Budapest'
);
const endTimeDateTime = fromZonedTime('2025-07-20T00:00:00', 'Europe/Budapest');
const calculateTimeLeft = () => {
  const startTime = new Date(startTimeDateTime).getTime();
  const endTime = new Date(endTimeDateTime).getTime();
  const now = new Date().getTime();
  const timeUntilStartTime = startTime - now;
  const timeSinceEndTime = now - endTime;
  console.log(endTime);
  console.log(now);
  console.log(timeSinceEndTime);

  const daysUntilStartTime = Math.floor(
    timeUntilStartTime / (1000 * 60 * 60 * 24)
  );
  const hoursUntilStartTime = Math.floor(
    (timeUntilStartTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesUntilStartTime = Math.floor(
    (timeUntilStartTime % (1000 * 60 * 60)) / (1000 * 60)
  );
  const secondsUntilStartTime = Math.floor(
    (timeUntilStartTime % (1000 * 60)) / 1000
  );

  const daysSinceEndTime = Math.floor(timeSinceEndTime / (1000 * 60 * 60 * 24));
  const hoursSinceEndTime = Math.floor(
    (timeSinceEndTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesSinceEndTime = Math.floor(
    (timeSinceEndTime % (1000 * 60 * 60)) / (1000 * 60)
  );
  const secondsSinceEndTime = Math.floor(
    (timeSinceEndTime % (1000 * 60)) / 1000
  );

  return {
    timeUntilStartTime,
    daysUntilStartTime,
    hoursUntilStartTime,
    minutesUntilStartTime,
    secondsUntilStartTime,
    timeSinceEndTime,
    daysSinceEndTime,
    hoursSinceEndTime,
    minutesSinceEndTime,
    secondsSinceEndTime,
  };
};

export default Countdown;
