import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY = 'videoplayer-current-time';
const currentTime = localStorage.getItem(KEY);

//method on
const getPlaybackTime = function (time) {
//тіло f-ї
  localStorage.setItem(KEY, JSON.stringify(time.seconds));
};

player.on('timeupdate', throttle(getPlaybackTime, 1000));

// метод setCurrentTime + ймовірні еррори

player
  .setCurrentTime(Number(currentTime))
  .then(seconds => {
    console.log(`current time:  ${seconds}`);
  })
  .catch(error => {
    switch (error.name) {
      case 'RangeError':
        console.log(
          `the time was less than 0 or greater than the video’s duration`
        );
        break;

      default:
        console.log(`some other error occurred`);
        break;
    }
  });


