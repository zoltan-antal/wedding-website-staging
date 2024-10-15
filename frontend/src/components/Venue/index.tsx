import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import venueFar from '../../assets/images/photos/venue-far.jpg';
import venueOutside from '../../assets/images/photos/venue-outside.jpg';
import venueInside from '../../assets/images/photos/venue-inside.jpg';
import venueTerrace from '../../assets/images/photos/venue-terrace.jpg';
import venuePond from '../../assets/images/photos/venue-pond.jpg';
import './index.css';

const Venue = () => {
  const { language, mainRef, navWidth } = useOutletContext<Context>();

  return (
    <main ref={mainRef} style={{ width: `${navWidth}px` }} id="venue-page">
      <h1>{{ English: 'Venue', Hungarian: 'Helyszín' }[language]}</h1>
      <div>
        <img src={venueFar} id="photo-far" />
        <div className="section" id="intro1">
          <p>
            <strong>
              {
                {
                  English: 'Welcome to Társa Pagony!',
                  Hungarian: 'Köszöntünk a Társa Pagonyban!',
                }[language]
              }
            </strong>
            <br />
            {
              {
                English:
                  'An exclusive area in the far reaches of the Pest countryside, surrounded by woodland, ideal for undisturbed festivities. We hope you will love it as much as we do!',
                Hungarian:
                  'Ez egy különleges helyszín Pest megye szélén, erdőkkel övezve: ideális zavartalan ünnepléshez. Reméljük, nektek is annyira fog tetszeni, mint nekünk!',
              }[language]
            }
          </p>
        </div>
        <img src={venueOutside} id="photo-outside" />
        <div className="section" id="intro2">
          <p>
            {
              {
                English:
                  "Turning off from the country road leading to the venue, you'll soon be greeted by the Barn:",
                Hungarian:
                  'A helyszínre vezető országútról lekanyarodva rövidesen megpillantod a Pajtát:',
              }[language]
            }
            <br />
            {
              {
                English:
                  'the heart of the estate, purposefully designed for intimate weddings.',
                Hungarian:
                  'ez a birtok szíve, kifejezetten esküvőkre tervezve.',
              }[language]
            }
          </p>
        </div>
        <img src={venueInside} id="photo-inside" />
        <div className="section" id="barn">
          <p>
            {
              {
                English:
                  "The reception will take place inside the Barn. You will also find here the bar, a kitchen, and bathrooms with toilets and showers. There's also a quieter lobby if you need some space.",
                Hungarian:
                  'A fogadásra a Pajtában kerül sor. Itt található a bár, konyha, valamint mosdók WC-vel és zuhanyzóval. Van egy csendesebb mellékrész is, ha egy kis nyugalomra vágysz.',
              }[language]
            }
          </p>
        </div>
        <img src={venueTerrace} id="photo-terrace" />
        <div className="section" id="terrace">
          <p>
            {
              {
                English:
                  "One of the main attractions of Társa Pagony is the terrace where you can soak in the sprawling woodland views. It'll be decked out with seating for you to sit and relax at any point during the course of the day.",
                Hungarian:
                  'A Pagony egyik fő különlegessége a terasz, ahol kilátás fogad az erdőre. A nap folyamán bármikor leülhetsz pihenni a teraszon.',
              }[language]
            }
          </p>
        </div>
        <img src={venuePond} id="photo-pond" />
        <div className="section" id="pond">
          <p>
            {
              {
                English:
                  'Throughout the day, we will also spend time on the venue grounds, which feature a pond and a campfire pit. The ceremony will be held out here, at the back of the grounds.',
                Hungarian:
                  'A nap során a Pajta mögötti részen is fogunk időt tölteni, ahol egy tó és tűzrakóhely is található. A ceremónia itt, a terület hátsó részén lesz megtartva.',
              }[language]
            }
          </p>
        </div>
      </div>
    </main>
  );
};

export default Venue;
