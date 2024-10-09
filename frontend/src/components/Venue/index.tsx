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
        <p id="intro1">
          <strong>
            {
              {
                English: 'Welcome to Társa Pagony!',
                Hungarian: '',
              }[language]
            }
          </strong>
          <br />
          {
            {
              English:
                'An exclusive area in the far reaches of the Pest countryside, surrounded by woodland, ideal for undisturbed festivities. We hope you will love it as much as we do!',
              Hungarian: '',
            }[language]
          }
        </p>
        <p id="intro2">
          {
            {
              English:
                'Turning off from the country road leading to the venue, you will soon be greeted by the Barn:',
              Hungarian: '',
            }[language]
          }
          <br />
          {
            {
              English:
                'the heart of the estate, purposefully designed for intimate weddings.',
              Hungarian: '',
            }[language]
          }
        </p>
        <p id="barn">
          {
            {
              English:
                "The reception will take place inside the Barn. You will also find here the bar, a kitchen, and bathrooms with toilets and showers. There's also a quieter lobby if you need some space.",
              Hungarian: '',
            }[language]
          }
        </p>
        <p id="terrace">
          {
            {
              English:
                "One of the main attractions of Társa Pagony is the terrace where you can soak in the sprawling woodland views. It'll be decked out with seating for you to sit and relax at any point during the course of the day.",
              Hungarian: '',
            }[language]
          }
        </p>
        <p id="pond">
          {
            {
              English:
                'Throughout the day we will also spend time on the venue grounds, which feature a pond and a campfire pit. The ceremony will be held out here, at the back of the grounds.',
              Hungarian: '',
            }[language]
          }
        </p>
        <img src={venueFar} id="photo-far" />
        <img src={venueOutside} id="photo-outside" />
        <img src={venueInside} id="photo-inside" />
        <img src={venueTerrace} id="photo-terrace" />
        <img src={venuePond} id="photo-pond" />
      </div>
    </main>
  );
};

export default Venue;
