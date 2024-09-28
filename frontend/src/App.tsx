import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { Language } from './types/language';
import { Guest } from './types/guest';
import { Household } from './types/household';
import { Context } from './types/context';
import guestService from './services/guest';
import householdService from './services/household';

function App() {
  const [language, setLanguage] = useState<Language>(
    localStorage.getItem('EllaZoltanLanguage') !== null
      ? (localStorage.getItem('EllaZoltanLanguage') as Language)
      : navigator.language === 'hu'
      ? 'Hungarian'
      : 'English'
  );
  const [guest, setGuest] = useState<Guest | null>(null);
  const [household, setHousehold] = useState<Household | null>(null);
  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const guestData = await guestService.me();
        setGuest(guestData);
      } catch (error) {
        console.error('Error fetching guest data: ', error);
      }
    };
    fetchGuestData();

    const fetchHouseholdData = async () => {
      try {
        const householdData = await householdService.me();
        setHousehold(householdData);
      } catch (error) {
        console.error('Error fetching household data: ', error);
      }
    };
    fetchHouseholdData();
  }, []);

  return (
    <>
      <Header
        language={language}
        setLanguage={setLanguage}
        guest={guest}
        setGuest={setGuest}
        setHousehold={setHousehold}
      ></Header>
      <Outlet
        context={
          {
            language,
            guest,
            setGuest,
            household,
            setHousehold,
          } satisfies Context
        }
      />
      <Footer></Footer>
    </>
  );
}

export default App;
