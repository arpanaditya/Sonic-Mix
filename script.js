window.onload = () => {

  const song_img = document.querySelector('#p_img');
  const song_title = document.querySelector('#p_title');
  const song_artist = document.querySelector('#p_desc');
  const play_btn = document.querySelector('#play');
  const play_btn_icon = document.querySelector('.play-icon');
  const next_btn = document.querySelector('#next');
  const previous_btn = document.querySelector('#previous');
  const player = document.querySelector('#player');

  const seek_slider = document.querySelector(".seek_slider");

  const curr_time = document.querySelector(".current-time");
  const total_duration = document.querySelector(".total-duration");
  let curr_song_index;
  let next_song_index;

  let curr_track = document.createElement('audio');

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
      play_btn_icon.classList.remove('fa-play');
      play_btn_icon.classList.add('fa-pause');
    } else {
      player.pause();
      play_btn_icon.classList.remove('fa-pause');
      play_btn_icon.classList.add('fa-play');
    }
  }


  function changeMusic(next = true) {
    
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

  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }

  
 function seek_(){

   seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}


function seekUpdate() {
  let seekPosition = 0;
  
  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
  
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
  
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
  
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
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

  function updatePlayer() {
    song_img.style =
      "background-image: url('" + music[curr_song_index].image_path + "')";
    song_title.innerText = music[curr_song_index].title;
    song_artist.innerText = music[curr_song_index].artist;
    player.src = music[curr_song_index].song_path;
  }

  function getDuration(src, cb) {
    var audio = new Audio();
    $(audio).on("loadedmetadata", function(){
        cb(audio.duration);
    });
    audio.src = src;
}
getDuration(music[0].song_path, function(length) {
    console.log('I got length ' + length);
    document.getElementById("duration").textContent = length;
});
}
