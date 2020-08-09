import Sound from 'react-native-sound';

const soundList = [
  'C4',
  'Cs4',
  'D4',
  'Ds4',
  'E4',
  'F4',
  'Fs4',
  'G4',
  'Gs4',
  'A4',
  'As4',
  'B4',
];

//initialize local sound list using 'react-native-sound'
let sound = [];
soundList.forEach((note) => {
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
    //TODO: setVolume 간격 정하기, 아마 변수로 나오지 않을까 싶다.
    for (let i = 0; i < 1400; i++) {
      sound[note].setVolume(1.0 - i / 1400);
    }
    sound[note].stop();
    sound[note].setVolume(1.0);
  }, 1);
};

export {stroke, stop};
