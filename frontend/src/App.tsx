import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';
import { Language } from './types/language';

function App() {
  const [language, setLanguage] = useState<Language>('English');

  return (
    <>
      <Header language={language} setLanguage={setLanguage}></Header>
      <Outlet context={{ language }} />
      <Footer></Footer>
    </>
  );
}

export default App;
