window.onload = () => {
  const song_img = document.querySelector('#p_img');
  const song_title = document.querySelector('#p_title');
  const song_artist = document.querySelector('#p_desc');
  const play_btn = document.querySelector('#play');
  const play_btn_icon = document.querySelector('.play-icon');
  const next_btn = document.querySelector('#next');
  const previous_btn = document.querySelector('#previous');
  const player = document.querySelector('#player');
  let progress = document.getElementById("progress");
  let curr_song_index;
  let next_song_index;
  "use strict";
  let percent = 0;
  let minute = 0;
  let second = 0;
  let cron;

  // Music List

  let music = [
    {
      title: 'Paris',
      artist: 'The Chainsmokers',
      song_path: 'music/paris.mp3',
      image_path: 'img/paris.jpg'
    },
    {
      title: 'Look What You Made Me Do',
      artist: 'Taylor Swift',
      song_path: 'music/look_what_you_made_me_do.mp3',
      image_path: 'img/look_what_you_made_me_do.jpg'
    },
    {
      title: 'High',
      artist: 'The Chainsmokers',
      song_path: 'music/High.mp3',
      image_path: 'img/high.jpg'
    },
    {
      title: 'Stay',
      artist: 'The kid LAROI & Justin Bieber',
      song_path: 'music/stay.mp3',
      image_path: 'img/stay.jpg'
    },
    {
      title: 'Something Just Like This',
      artist: 'The Chainsmokers',
      song_path: 'music/something_just_like_this.mp3',
      image_path: 'img/something_just_like_this.jpg'
    },
    {
      title: 'Treat You Better',
      artist: 'Shawn Mendes',
      song_path: 'music/treat_you_better.mp3',
      image_path: 'img/treat_you_better.jpg'
    }
  ];

  play_btn.addEventListener('click', togglePlay);
  next_btn.addEventListener('click', () => changeMusic());
  previous_btn.addEventListener('click', () => changeMusic(false));

// Alternative way to change music
  // next_btn.addEventListener('click', () => changeMusic(next));
  // previous_btn.addEventListener('click', () => changeMusic(previous));

  startPlayer();

  function startPlayer() {
    curr_song_index = 0;
    next_song_index = curr_song_index + 1;
    updatePlayer();
  }


  function togglePlay() {
    if (player.paused) {
      player.play();
      startTimer();
      play_btn_icon.classList.remove('fa-play');
      play_btn_icon.classList.add('fa-pause');
    } else {
      player.pause();
      pauseTimer();
      play_btn_icon.classList.remove('fa-pause');
      play_btn_icon.classList.add('fa-play');
    }
  }


  function changeMusic(next = true) {
    resetTimer();
    if (next) {
      curr_song_index++;
      next_song_index = curr_song_index + 1;

      if (curr_song_index > music.length - 1) {
        curr_song_index = 0;
        next_song_index = curr_song_index + 1;
      }
      if (next_song_index > music.length - 1) {
        next_song_index = 0;
      }
    } else {
      curr_song_index--;
      next_song_index = curr_song_index + 1;

      if (curr_song_index < 0) {
        curr_song_index = music.length - 1;
        next_song_index = 0;
      }
    }
    updatePlayer();
    togglePlay();
  }

  // Alternative Way to change music using 2 functions changeMusic(next), changeMusic(previous)
  // function changeMusic(next) {
  //   curr_song_index++;
  //     next_song_index = curr_song_index + 1;

  //     if (curr_song_index > music.length - 1) {
  //       curr_song_index = 0;
  //       next_song_index = curr_song_index + 1;
  //     }
  //     if (next_song_index > music.length - 1) {
  //       next_song_index = 0;
  //     }
  //     updatePlayer();
  //     togglePlay();
  // }

  // function changeMusic(previous) {
  //   curr_song_index--;
  //     next_song_index = curr_song_index + 1;

  //     if (curr_song_index < 0) {
  //       curr_song_index = music.length - 1;
  //       next_song_index = 0;
  //     }
  //     updatePlayer();
  //     togglePlay();
  // }

  // Music timer
  function startTimer() {
    pauseTimer();
    cron = setInterval(() => { timer(); }, 1000);
  }

  function pauseTimer() {
    clearInterval(cron);
  }
  
  function resetTimer() {
    percent=0;
    progress.style.width = percent+'%'
    minute=0;
    second=0;
    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';
  }
  function timer() {
    if(percent>=100){
      changeMusic();
    }
    second++;
    if (second == 60) {
      second = 0;
      minute++;
    }
    const totalDuration=document.querySelector('#player').duration;
    percent = (minute*60 + second)/parseInt(totalDuration)*100
    progress.style.width = percent+'%'
    //console.log(totalDuration)
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
  }
  
  function returnData(input) {
    return input >= 10 ? input : `0${input}`
  }  
  
  function updatePlayer() {
    song_img.style =
      "background-image: url('" + music[curr_song_index].image_path + "')";
    song_title.innerText = music[curr_song_index].title;
    song_artist.innerText = music[curr_song_index].artist;
    player.src = music[curr_song_index].song_path;
  }
}
