import { createHashRouter } from 'react-router-dom';
import App from '../App';
import Home from '../components/Home';
import Location from '../components/Location';
import Travel from '../components/Travel';
import Schedule from '../components/Schedule';
import Registry from '../components/Registry';
import Faq from '../components/Faq';
import Rsvp from '../components/Rsvp';

const router = createHashRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'location', element: <Location /> },
        { path: 'travel', element: <Travel /> },
        { path: 'schedule', element: <Schedule /> },
        { path: 'registry', element: <Registry /> },
        { path: 'faq', element: <Faq /> },
        { path: 'rsvp', element: <Rsvp /> },
      ],
    },
  ],
  { basename: '/' }
);

export default router;
