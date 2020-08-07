import Sound from 'react-native-sound';

const soundList = [
  'C',
  'Cs',
  'D',
  'Ds',
  'E',
  'F',
  'Fs',
  'G',
  'Gs',
  'A',
  'As',
  'B',
];

//initialize local sound list using 'react-native-sound'
let sound = [];
soundList.forEach((note) => {
  console.log(note);
  sound[note] = new Sound(note + '.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound.', error);
    }
  });
});

console.log(sound);
const stroke = (note) => {
  setTimeout(() => {
    sound[note].play((success) => {
      if (success) {
        console.log('successfully finished playing.');
      } else {
        console.log('failed to play the sound.');
      }
    });
  }, 1);
};

const stop = (note) => {
  // stop sound
  setTimeout(() => {
    // gradually decrease the volume
    for (let i = 0; i < 2000; i++) {
      sound[note].setVolume(1.0 - i / 2000);
    }
    sound[note].stop();
    sound[note].setVolume(1.0);
  }, 1);
};

export {stroke, stop};
