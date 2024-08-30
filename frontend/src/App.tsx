import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { Language } from './types/language';
import { Guest } from './types/guest';
import guestService from './services/guest';

function App() {
  const [language, setLanguage] = useState<Language>(
    localStorage.getItem('EllaZoltanLanguage') !== null
      ? (localStorage.getItem('EllaZoltanLanguage') as Language)
      : navigator.language === 'hu'
      ? 'Hungarian'
      : 'English'
  );
  const [guest, setGuest] = useState<Guest | null>(null);
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
  }, []);

  return (
    <>
      <Header
        language={language}
        setLanguage={setLanguage}
        guest={guest}
      ></Header>
      <Outlet context={{ language }} />
      <Footer></Footer>
    </>
  );
}

export default App;
