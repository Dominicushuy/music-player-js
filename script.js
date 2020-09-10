const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name:'hon_ca_yeu',
    displayName:'Hơn cả yêu',
    artist:'Anh Đức Phúc đẹp trai'
  },
  {
    name:'anh_nang_cua_anh',
    displayName:'Ánh nắng của anh',
    artist:'Anh Phúc Handsome'
  },
  {
    name:'cuoi_nhau_di',
    displayName:'Cưới Nhau Đi (Yes I Do)',
    artist:'Bùi Anh Tuấn, Hiền Hồ'
  },
  {
    name:'noi_nay_co_anh',
    displayName:'Nơi này có anh',
    artist:'Sếp Tùng Cute'
  },
  {
    name:'chac_ai_do_se_ve',
    displayName:'Chắc ai đó sẽ về',
    artist:'Sếp Tùng Cute'
  },
  {
    name:'my_everything',
    displayName:'My Everything',
    artist:'Chị Tiên Tiên'
  },
  {
    name:'say_you_do',
    displayName:'Say you do',
    artist:'Chị Tiên Tiên'
  },
  {
    name:'yeu_khong_nghi_phep',
    displayName:'Yêu không nghỉ phép',
    artist:'ISAAC ft. OnlyC'
  },
  {
    name:'minh_yeu_nhau_di',
    displayName:'Mình yêu nhau đi',
    artist:'Bích Phương'
  },
  {
    name:'vi_ai_vi_anh',
    displayName:'Vì ai vì anh',
    artist:'Đông Nhi'
  },
  {
    name:'dau_mua',
    displayName:'Dấu mưa',
    artist:'Trung Quân idol'
  },
  {
    name:'trot_yeu',
    displayName:'Trót yêu',
    artist:'Trung Quân idol'
  },
  {
    name:'nguoi_la_oi',
    displayName:'Người lạ ơi',
    artist:'Superbrothers x Karik x Orange'
  },
  {
    name:'phia_sau_mot_co_gai',
    displayName:'Phía sau một cô gái',
    artist:'Soobin Hoàng Sơn'
  },
  {
    name:'yeu_5',
    displayName:'Yêu 5',
    artist:'Rhymastic'
  },
  {
    name:'nguoi_ay',
    displayName:'Người ấy',
    artist:'Trịnh Thăng Bình'
  },
  {
    name:'em_gai_mua',
    displayName:'Em gái mưa',
    artist:'Hương Tràm'
  }

];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
