import { createHashRouter } from 'react-router-dom';
import App from '../App';
import Home from '../components/Home/Home';
import Venue from '../components/Venue/Venue';
import Accommodation from '../components/Accommodation/Accommodation';
import Travel from '../components/Travel/Travel';
import Schedule from '../components/Schedule/Schedule';
import DressCode from '../components/DressCode/DressCode';
import PostWedding from '../components/PostWedding/PostWedding';
import Faq from '../components/Faq/Faq';
import Contact from '../components/Contact/Contact';
import Rsvp from '../components/Rsvp/Rsvp';
import Login from '../components/Login/Login';
import ResetPassword from '../components/Login/ResetPassword';
import NotFound from './NotFound';
import Account from '../components/Account/Account';
import ChangePassword from '../components/Account/ChangePassword';
import ChangeEmail from '../components/Account/ChangeEmail';

const router = createHashRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'venue', element: <Venue /> },
        { path: 'accommodation', element: <Accommodation /> },
        { path: 'travel', element: <Travel /> },
        { path: 'schedule', element: <Schedule /> },
        { path: 'dress-code', element: <DressCode /> },
        { path: 'post-wedding', element: <PostWedding /> },
        { path: 'faq', element: <Faq /> },
        { path: 'contact', element: <Contact /> },
        { path: 'rsvp', element: <Rsvp /> },
        { path: 'login', element: <Login /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'account', element: <Account /> },
        { path: 'change-password', element: <ChangePassword /> },
        { path: 'change-email', element: <ChangeEmail /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: '/' }
);

export default router;
