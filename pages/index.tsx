import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import Image from "next/image";

//React Icons
import {
  BsSoundwave,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsFillPlayFill,
  BsPauseFill,
} from "react-icons/bs";

//Music Data
import { MUSIC_DATA } from "../data/MusicData";

const Home: NextPage = () => {
  //toggle data
  const [index, setIndex] = React.useState(0);

  //play music state
  const [run, setRun] = React.useState(false);

  //audio state
  const [audio, setAudio]: any = React.useState(null);

  //Progress
  const [percent, setPercent]: any = React.useState(0);

  //Timer
  let s = 0;
  let m = 0;
  let h = 0;
  const [Hour, setHour] = React.useState(h);
  const [min, setmin] = React.useState(m);
  const [sec, setsec] = React.useState(s);
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  //Timer reference
  const countRef: any = React.useRef(null);

  //MUSIC PLAY
  const play = () => {
    audio.play();
    if (isActive) {
      resume();
    } else {
      start();
    }
    setRun(true);
  };

  //PAUSE
  const pas = () => {
    audio.pause();
    stop();
    setRun(false);
  };

  //SWITCH TO THE NEXT
  const next = () => {
    pas();
    restart();
    if (index < MUSIC_DATA.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  //SWITCH TO PREVIOUS
  const pre = () => {
    pas();
    restart();
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(MUSIC_DATA.length - 1);
    }
  };

  //START TIMER
  const start = () => {
    setIsActive(!isActive);
    countRef.current = setInterval(() => {
      let prcnt: any = (m * 60 + s) / (parseInt(audio.duration) / 100);
      setPercent(prcnt);

      if (percent > 100) {
        next();
      }
      s++;
      setsec(s);
      if (s === 60) {
        m++;
        setmin(m);
        if (m === 60) {
          h++;
          setHour(h);
          m = 0;
          setmin(m);
        }
        s = 0;
        setsec(s);
      }
    }, 1000);
  };

  //RESUME
  const resume = () => {
    h = Hour;
    m = min;
    s = sec;
    start();
    setIsPaused(!isPaused);
    setIsActive(!isActive);
  };

  //RESTART
  const restart = () => {
    clearInterval(countRef.current);
    setIsActive(!isActive);
    setHour(0);
    setmin(0);
    setsec(0);
    setPercent(0);
  };

  //STOP TIMER
  const stop = () => {
    clearInterval(countRef.current);
    setIsPaused(!isPaused);
  };

  //SETTING MUSIC
  React.useEffect(() => {
    if (index >= 0 && index <= MUSIC_DATA.length) {
      setAudio(new Audio(MUSIC_DATA[index].song_path));
    }
  }, [index]);

  return (
    <div className='w-screen h-screen bg-gray-900 selection:text-white selection:bg-indigo-600'>
      <Head>
        <title>Sonic Mix</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='h-full w-full flex justify-center items-center'>
        {/*------------------------------MAIN CARD---------------------------*/}

        <div
          style={{
            backgroundImage: `url('` + MUSIC_DATA[index].image_path + `')`,
          }}
          className={`h-[34rem] w-96 bg-center bg-no-repeat bg-cover rounded-xl m-2 `}
        >
          <div className='h-full w-full p-4 bg-gray-800/60 backdrop-blur-xl rounded-xl flex flex-col justify-start items-center shadow-2xl border-2 border-gray-50/5'>
            {/*------------------------------NAME---------------------------*/}

            <div className='flex flex-row justify-center items-center text-center text-xl font-bold tracking-wider text-gray-50/60 uppercase select-none pl-1'>
              <div className='pr-1'>Sonic mix</div> <BsSoundwave size={26} />
            </div>

            {/*------------------------------MUSIC IMAGE---------------------------*/}

            <div className='w-72 h-72 rounded-xl overflow-hidden bg-gray-600 mt-4 shadow-md'>
              <Image
                src={MUSIC_DATA[index].image_path}
                alt='music'
                height={280}
                width={290}
              />
            </div>

            {/*------------------------------MUSIC NAME & ARTIST---------------------------*/}

            <div className='w-72 text-lg text-center mt-3 text-gray-50 font-medium tracking-wider truncate'>
              {MUSIC_DATA[index].title}
            </div>

            <div className='w-72 h-6 text-xs tracking-wider leading-4 text-center mb-4 text-gray-50/50  truncate'>
              {MUSIC_DATA[index].artist}
            </div>

            {/*------------------------------MUSIC PROGRESS---------------------------*/}

            <div className='w-full px-8 select-none'>
              <div className='w-full h-[4px] rounded-full bg-gray-50/20 relative'>
                <div
                  style={{ width: `${percent}%` }}
                  className={`h-[4px] rounded-full bg-indigo-600 absolute  ease-linear duration-150`}
                ></div>
                <div
                  style={{ left: `${percent - 1}%` }}
                  className={`w-3 h-3 rounded-full bg-gray-50 absolute -bottom-[4px] ease-linear duration-150`}
                ></div>
              </div>
            </div>

            {/*------------------------------MUSIC TIMING---------------------------*/}

            <div className='w-full px-8 flex flex-row justify-center my-2 text-sm text-gray-50/60 font-medium mt-[2px] select-none'>
              <div>
                {min >= 10 ? "" : "0"}
                {min} : {sec >= 10 ? "" : "0"}
                {sec}
              </div>
            </div>

            {/*------------------------------MUSIC CONTROL---------------------------*/}

            <div className='w-full flex flex-row justify-center items-center space-x-4 text-gray-50 select-none'>
              {/*------------------------------MUSIC PREV---------------------------*/}

              <button
                onClick={() => pre()}
                className='p-2 rounded-full hover:bg-gray-50/5 hover:scale-110 active:scale-95 ease-linear duration-100 border-2 border-gray-50/5'
              >
                <BsFillSkipStartFill size={30} />
              </button>

              {/*------------------------------MUSIC PLAY/PAUSE---------------------------*/}

              <button
                onClick={() => (run ? pas() : play())}
                className='p-2 rounded-full hover:bg-gray-50/5 hover:scale-110 active:scale-95 ease-linear duration-100 border-2 border-gray-50/5'
              >
                {run ? (
                  <BsPauseFill size={60} />
                ) : (
                  <BsFillPlayFill className='pl-1' size={60} />
                )}
              </button>

              {/*------------------------------MUSIC NEXT---------------------------*/}

              <button
                onClick={() => next()}
                className='p-2 rounded-full hover:bg-gray-50/5 hover:scale-110 active:scale-95 ease-linear duration-100 border-2 border-gray-50/5'
              >
                <BsFillSkipEndFill size={30} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;