'use client';

import AboutMe from '@/components/AboutMe/AboutMe';
import Main from '@/components/Main/Main';
import Image from 'next/image';
import concert from '../../public/util/CONCERT.png';
import MyMusic from '@/components/MyMusic/MyMusic';

export default function Home() {
  return (
    <main>
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
    </main>
  );
}
