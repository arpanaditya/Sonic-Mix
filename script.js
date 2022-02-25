window.onload = () => {
  const song_img = document.querySelector("#p_img");
  const song_title = document.querySelector("#p_title");
  const song_artist = document.querySelector("#p_desc");
  const play_btn = document.querySelector("#play");
  const play_btn_icon = document.querySelector(".play-icon");
  const next_btn = document.querySelector("#next");
  const previous_btn = document.querySelector("#previous");
  const player = document.querySelector("#player");
  let curr_song_index;
  let next_song_index;

  // Music List

  let music = [
    {
      title: 'Paris',
      artist: 'The Chainsmokers',
      song_path: 'music/paris.mp3',
      image_path: 'img/paris.jpg',
    },
    {
      title: 'Look What You Made Me Do',
      artist: 'Taylor Swift',
      song_path: 'music/look_what_you_made_me_do.mp3',
      image_path: 'img/look_what_you_made_me_do.jpg',
    },
    {
      title: 'High',
      artist: 'The Chainsmokers',
      song_path: 'music/High.mp3',
      image_path: 'img/high.jpg',
    },
    {
      title: 'Stay',
      artist: 'The kid LAROI & Justin Bieber',
      song_path: 'music/stay.mp3',
      image_path: 'img/stay.jpg',
    },
    {
      title: 'Something Just Like This',
      artist: 'The Chainsmokers',
      song_path: 'music/something_just_like_this.mp3',
      image_path: 'img/something_just_like_this.jpg',
    },
  ];

  play_btn.addEventListener("click", () => togglePlay());
  next_btn.addEventListener("click", () => changeMusic());
  previous_btn.addEventListener("click", () => changeMusic(false));

  function startPlayer() {
    curr_song_index = 0;
    next_song_index = current_song_index + 1;
    updatePlayer();
  }
  player.play();
  function togglePlay() {
    if (player.paused) {
      player.play();
      play_btn_icon.classList.remove("fa-play");
      play_btn_icon.classList.add("fa-pause");
    } else {
      player.pause();
      play_btn_icon.classList.remove("fa-pause");
      play_btn_icon.classList.add("fa-play");
    }
  }

  function changeMusic(next = true) {
    if (next) {
      current_song_index++;
      next_song_index = current_song_index + 1;

      if (curr_song_index > music.length - 1) {
        current_song_index = 0;
        next_song_index = current_song_index + 1;
      }
      if (next_song_index > music.length - 1) {
        next_song_index = 0;
      }
    } else {
      curr_song_index--;
      next_song_index = current_song_index + 1;

      if (current_song_index < 0) {
        curr_song_index = music.length - 1;
        next_song_index = 0;
      }
    }
    updatePlayer();
    togglePlay();
  }

  function updatePlayer() {
    song_img.style =
      "background-image: url('" + music[curr_song_index].image_path + "')";
    song_title.innerText = music[curr_song_index].title;
    song_artist.innerText = music[curr_song_index].artist;
    player.src = song.song_path;
  }
}
