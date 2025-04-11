import { createHashRouter } from 'react-router-dom';
import App from '../App';
import Accommodation from '../components/Accommodation/Accommodation';
import Account from '../components/Account/Account';
import ChangeEmail from '../components/Account/ChangeEmail';
import ChangePassword from '../components/Account/ChangePassword';
import Contact from '../components/Contact/Contact';
import DressCode from '../components/DressCode/DressCode';
import Faq from '../components/Faq/Faq';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import ResetPassword from '../components/Login/ResetPassword';
import PostWedding from '../components/PostWedding/PostWedding';
import Registry from '../components/Registry/Registry';
import Rsvp from '../components/Rsvp/Rsvp';
import Schedule from '../components/Schedule/Schedule';
import Travel from '../components/Travel/Travel';
import Venue from '../components/Venue/Venue';
import NotFound from './NotFound';

const router = createHashRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'accommodation', element: <Accommodation /> },
        { path: 'account', element: <Account /> },
        { path: 'change-email', element: <ChangeEmail /> },
        { path: 'change-password', element: <ChangePassword /> },
        { path: 'contact', element: <Contact /> },
        { path: 'dress-code', element: <DressCode /> },
        { path: 'faq', element: <Faq /> },
        { path: 'login', element: <Login /> },
        { path: 'post-wedding', element: <PostWedding /> },
        { path: 'registry', element: <Registry /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'rsvp', element: <Rsvp /> },
        { path: 'schedule', element: <Schedule /> },
        { path: 'travel', element: <Travel /> },
        { path: 'venue', element: <Venue /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: '/' }
);

export default router;
