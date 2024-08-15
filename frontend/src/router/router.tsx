import { createHashRouter } from 'react-router-dom';
import App from '../App';
import Home from '../components/Home';
import Schedule from '../components/Schedule';

const router = createHashRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'schedule', element: <Schedule /> },
      ],
    },
  ],
  { basename: '/' }
);

export default router;
