
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_STORAGE = 'videoplayer-current-time';

const player = new Player('vimeo-player');

restoreVideoPosition();

player.on('timeupdate', throttle(carrentTime, 1000));
    
    
function carrentTime(e) {
    localStorage.setItem(TIME_STORAGE, e.seconds);
};


function restoreVideoPosition() {
  const currentTimeStamp = localStorage.getItem(TIME_STORAGE);
  if (currentTimeStamp) {
    player.setCurrentTime(currentTimeStamp);
  }
}




