import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';
import { Language } from './types/language';

function App() {
  const [language, setLanguage] = useState<Language>(
    localStorage.getItem('EllaZoltanLanguage') !== null
      ? (localStorage.getItem('EllaZoltanLanguage') as Language)
      : navigator.language === 'hu'
      ? 'Hungarian'
      : 'English'
  );

  return (
    <>
      <Header language={language} setLanguage={setLanguage}></Header>
      <Outlet context={{ language }} />
      <Footer></Footer>
    </>
  );
}

export default App;
