import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import speckleImage from './assets/images/graphics/speckle.webp';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import authService from './services/auth';
import guestService from './services/guest';
import householdService from './services/household';
import pingService from './services/ping';
import { AuthStatus } from './types/auth';
import { Context } from './types/context';
import { Guest } from './types/guest';
import { Household } from './types/household';
import { Language } from './types/language';

function App() {
  const [language, setLanguage] = useState<Language>(
    localStorage.getItem('EllaZoltanLanguage') !== null
      ? (localStorage.getItem('EllaZoltanLanguage') as Language)
      : navigator.language === 'hu' ||
        navigator.language === 'hu-HU' ||
        navigator.languages.includes('hu') ||
        navigator.languages.includes('hu-HU')
      ? 'Hungarian'
      : 'English'
  );
  const [isInitialised, setIsInitialised] = useState<boolean>(false);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [household, setHousehold] = useState<Household | null>(null);

  const mobileView =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const [menuOpen, setMenuOpen] = useState<boolean>(!mobileView ? true : false);

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        const authStatus: AuthStatus = await authService.status();
        return authStatus.loggedIn;
      } catch (error) {
        console.error('Error checking authentication status: ', error);
        return false;
      }
    };

    const fetchGuestData = async () => {
      try {
        const guestData = await guestService.me();
        setGuest(guestData);
      } catch (error) {
        console.error('Error fetching guest data: ', error);
      }
    };

    const fetchHouseholdData = async () => {
      try {
        const householdData = await householdService.me();
        setHousehold(householdData);
      } catch (error) {
        console.error('Error fetching household data: ', error);
      }
    };

    const fetchData = async () => {
      const loggedIn = await getAuthStatus();
      if (loggedIn) {
        await Promise.all([fetchGuestData(), fetchHouseholdData()]);
      }
      setIsInitialised(true);
    };

    fetchData();
  }, []);

  const navRef = useRef<HTMLElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const [navWidth, setNavWidth] = useState<number>(0);
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (navRef.current) {
        setNavWidth(navRef.current.offsetWidth);
      }
    });

    const currentNavRef = navRef.current;

    if (currentNavRef) {
      observer.observe(currentNavRef);
    }

    return () => {
      if (currentNavRef) {
        observer.unobserve(currentNavRef);
      }
    };
  }, []);

  const hasPingedBackend = useRef(false);
  useEffect(() => {
    if (!hasPingedBackend.current) {
      pingService.ping().then(() => {
        hasPingedBackend.current = true;
      });
    }
  }, []);

  return (
    <>
      <img src={speckleImage} className="speckle" id="speckle" />
      <Header
        mobileView={mobileView}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        language={language}
        setLanguage={setLanguage}
        guest={guest}
        setGuest={setGuest}
        setHousehold={setHousehold}
        navRef={navRef}
      />
      {navWidth > 0 ? (
        <Outlet
          context={
            {
              mobileView,
              language,
              isInitialised,
              guest,
              setGuest,
              household,
              setHousehold,
              mainRef,
              navWidth,
            } satisfies Context
          }
        />
      ) : (
        <Loading language={language} />
      )}
    </>
  );
}

export default App;
