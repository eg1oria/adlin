'use client';

import AboutMe from '@/components/AboutMe/AboutMe';
import Header from '@/components/Header/Header';
import Main from '@/components/Main/Main';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import concert from '../../public/util/CONCERT.png';
import MyMusic from '@/components/MyMusic/MyMusic';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('stop-header');

      if (aboutSection) {
        const aboutTop = aboutSection.offsetTop;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= aboutTop - 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      <header className={`header ${isVisible ? 'hide' : 'show'}`}>
        <Header />
      </header>

      <Main />

      <div id="stop-header">
        <AboutMe />
      </div>
      <Image
        src={concert}
        alt="Concert"
        style={{
          width: '100%',
        }}
      />
      <MyMusic />
      <Footer />
    </main>
  );
}
