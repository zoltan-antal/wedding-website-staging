import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import './index.css';

const Travel = () => {
  const { language, mainRef, navWidth } = useOutletContext<Context>();

  return (
    <main ref={mainRef} style={{ width: `${navWidth}px` }} id="travel-page">
      <h1>
        {
          {
            English: 'Travel',
            Hungarian: 'Érkezés',
          }[language]
        }
      </h1>
      {language === 'English' && (
        <p className="disclaimer">
          All prices and public transport times accurate as of October 2024.
        </p>
      )}
      <div>
        {language === 'English' && (
          <div className="section">
            <h2>Getting into the city from Budapest airport</h2>
            <div>
              <div className="subsection">
                <h3>By public transport</h3>
                <div>
                  <p>
                    There is a designated Airport Express bus service that takes
                    you into the city centre: bus <b>100E</b>.
                  </p>
                  <p>
                    This will drop you at three stops in the city centre: Kálvin
                    tér metro station, Astoria metro station, or Deák Ferenc tér
                    metro station. It runs for 24 hours, 7 days a week and takes
                    about 40 minutes to get to the city.
                  </p>
                  <p>
                    You need a specific ticket for this service (the normal
                    public transport single tickets and passes are not valid for
                    this service). You can buy the ticket at the airport or on
                    the Budapest GO app.
                  </p>
                  <p>
                    You must validate your ticket before getting on the bus by
                    scanning the QR code if using a digital ticket, or once you
                    are on the bus if using a physical ticket. There are little
                    machines on the bus poles where you can insert your ticket
                    and it will mark it.
                  </p>
                </div>
              </div>
              <div className="subsection">
                <h3>By taxi</h3>
                <div>
                  <p>
                    All licensed taxis in Budapest are yellow. The main company
                    serving the airport is called Főtaxi, but there are other
                    licences taxi companies (even Uber and Bolt are licensed and
                    yellow). All companies operate at the same price, so we
                    recommend you use Főtaxi.
                  </p>
                  <p>
                    The rates are a fixed tariff of 440 HUF/km (£0.92/km), in
                    addition to a one-off base fee of 1100 HUF (£2.29) and a
                    waiting fee. A ride to the city centre should typically cost
                    around 10000-12500 HUF (£20-25), depending on traffic
                    conditions. You should be able to pay by card.
                  </p>
                  <p>
                    You can make a reservation at the Főtaxi booths located at
                    the exits of Terminals 2A and 2B. We recommend booking here
                    rather than flagging down a taxi as there could be
                    non-licensed taxi service providers soliciting at the
                    terminal buildings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {language === 'English' && (
          <div className="section">
            <h2>Getting around Budapest</h2>
            <div>
              <p>
                We highly recommend downloading the Budapest GO app. You can buy
                your public transport tickets and check how to get from one
                place to another. There's a choice of single/timed tickets and
                passes valid for several days.
              </p>
            </div>
            <div>
              <div className="subsection">
                <h3>Ticket guide</h3>
                <div>
                  <p>
                    All tickets and passes are only valid within the city
                    limits, however you are unlikely to go outside of this zone.
                  </p>
                </div>
                <div>
                  <h4>Single ticket</h4>
                  <p>Cost: 450 HUF (600 HUF if you buy from the driver)</p>
                  <p>
                    Use: a single journey on one type of transport. Needs to be
                    validated. Whenever you get off and transfer to a new line
                    (even if you're on the same type of transport), you'll need
                    to use and validate a new ticket.
                  </p>
                </div>
                <div>
                  <h4>Set of 10 single tickets</h4>
                  <p>Cost: 4000 HUF</p>
                  <p>
                    Use: Cheaper way to buy single tickets if you need many.
                  </p>
                </div>
                <div>
                  <h4>Airport transfer ticket</h4>
                  <p>Cost: 2200 HUF</p>
                  <p>
                    Use: Specific ticket for the 100E airport bus straight to
                    the city centre from the airport.
                  </p>
                </div>
                <div>
                  <h4>30 & 90 minute tickets</h4>
                  <p>Cost: 530/750 HUF</p>
                  <p>
                    Use: Allows you an unlimited number of transfers between all
                    types of transport. Needs validating when you begin your
                    journey.
                  </p>
                </div>
                <div>
                  <h4>24 & 72 hour travelcards</h4>
                  <p>Cost: 2500/5500 HUF</p>
                  <p>
                    Use: Valid for the time period for an unlimited number of
                    trips. If you purchase a paper version, the ticket will
                    start the time period immediately. If you purchase a mobile
                    ticket, you can choose when the validity starts. There's
                    also a group 24 hour ticket for 5000 HUF, on which 5 people
                    can travel together.
                  </p>
                </div>
                <div>
                  <h4>15 day pass</h4>
                  <p>Cost: 5950 HUF</p>
                  <p>
                    Use: If you're staying in Budapest for more than 72 hours,
                    we recommend buying this ticket as it works out cheaper than
                    buying multiple 24/72 hour tickets.
                  </p>
                </div>
              </div>
              <div className="subsection">
                <h3>Ticket validation & other advice</h3>
                <div>
                  <p>
                    Tickets must validated when you begin your journey. Passes
                    and travelcards don't need to be validated.
                  </p>
                </div>
                <div>
                  <h4>Digital tickets</h4>
                  <p>
                    If you bought your ticket on the Budapest GO app, you need
                    to scan the QR code at the side of the vehicle before you
                    get on the bus/tram etc.
                  </p>
                </div>
                <div>
                  <h4>Physical tickets</h4>
                  <p>
                    <b>Bus</b>: There are be little machines mounted on the
                    poles inside the bus. You insert your ticket into the
                    opening and it should make a noise and mark the ticket once
                    you've inserted it in far enough. Some buses will request
                    that you board at the front door and show the driver your
                    ticket. The bus will say on the front "Felszállás az első
                    ajtón". This is more common in smaller buses outside of the
                    city centre.
                  </p>
                </div>
                <div>
                  <p>
                    <b>Tram/suburban railway</b>: The same machines are also on
                    the tram. On some trams, there's an old style of validating
                    tickets whereby you insert your ticket into the red block on
                    the top of the machine. You then pull the block towards you
                    until you can't pull it further, then release. These can be
                    temperamental so if one doesn't work, try another.
                  </p>
                </div>
                <div>
                  <p>
                    <b>Metro</b>: The validation machines will be at the metro
                    entrance before you get to the platform.
                  </p>
                </div>
                <div>
                  <h4>Inspectors</h4>
                  <p>
                    Budapest Transport inspectors will randomly come onto trams
                    and buses and ask to see your ticket. The inspectors will
                    sometimes be stationed to check your tickets at the
                    entrance/exit at the metro stops.
                    <br />
                    When you purchase a pass on the mobile app, it will ask you
                    to enter the an ID number. You can use your driving licence
                    or passport, but you have to have this piece of ID on you
                    when you use the pass. The inspectors rarely ask for it, but
                    you'll need it if they do.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="section">
          <h2>
            {
              {
                English: 'Travel to the wedding together',
                Hungarian: 'Közös utazás a helyszínre',
              }[language]
            }
          </h2>
          <div>
            <p>
              {
                {
                  English:
                    "We will arrange transport to and from Budapest. Once we have final numbers we'll give you more information on this.",
                  Hungarian:
                    'Budapest és a helyszín között biztosítjuk az utazást. Ha megvan a végleges létszám, további információt küldünk még erről.',
                }[language]
              }
            </p>
          </div>
        </div>
        <div className="section">
          <h2>
            {
              {
                English: 'Making your own way',
                Hungarian: 'Külön eljutás a helyszínre',
              }[language]
            }
          </h2>
          <div>
            <div className="subsection">
              <h3>
                {
                  {
                    English: 'By car',
                    Hungarian: 'Autóval',
                  }[language]
                }
              </h3>
              <div>
                <p>
                  {
                    {
                      English:
                        'Társa Pagony is a roughly 45 minute drive from the centre of Budapest, depending on traffic.',
                      Hungarian:
                        'Budapestről a Társa Pagonyt forgalomtól függően nagyjából 45 perc alatt lehet elérni.',
                    }[language]
                  }
                  <br />
                  {
                    {
                      English:
                        'The address is: Társa Pagony, Penc, 2614 Hungary. There is a sign at the turn off at the side of the road (to your left when driving up from Penc).',
                      Hungarian:
                        'A pontos cím: Társa Pagony, Penc 2614. Penc irányából felfelé haladva az úton balra van egy tábla: ott kell behajtani.',
                    }[language]
                  }
                  <br />
                  {
                    {
                      English: 'There is free parking at the venue.',
                      Hungarian: 'A helyszínen a parkolás díjmentes.',
                    }[language]
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Travel;
