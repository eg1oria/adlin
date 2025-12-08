import s from './Main.module.scss';
import back from '../../../public/util/MAIN.png';
import Image from 'next/image';

export default function Main() {
  return (
    <>
      <div className={s.main}>
        <Image src={back} alt="Adlin Image" className={s.adlin_image} />
      </div>
    </>
  );
}
