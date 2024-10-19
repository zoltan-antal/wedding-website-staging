import { createHashRouter } from 'react-router-dom';
import App from '../App';
import Home from '../components/Home';
import Venue from '../components/Venue';
import Accommodation from '../components/Accommodation';
import Travel from '../components/Travel';
import Schedule from '../components/Schedule';
import DressCode from '../components/DressCode';
import Registry from '../components/Registry';
import PostWedding from '../components/PostWedding';
import Faq from '../components/Faq';
import Contact from '../components/Contact';
import Rsvp from '../components/Rsvp';
import Login from '../components/Login';
import ResetPassword from '../components/Login/ResetPassword';
import NotFound from './NotFound';
import Account from '../components/Account';
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
        { path: 'registry', element: <Registry /> },
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
