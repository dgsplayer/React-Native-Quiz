import Sound from 'react-native-sound';

// Sound.setCategory('Ambient', true);

const buttonPress = new Sound(require('./button.mp3'), error => console.log(error));
export const playButtonPress = () => {
  buttonPress.play((success) => { 
    console.log('tocou sommmm', success);
    buttonPress.reset()});
}
