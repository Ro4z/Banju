import {NativeModules} from 'react-native';

class PianoSampler {
    constructor() {
        NativeModules.PianoSampler.prepare()
        this.playNote = NativeModules.PianoSampler.playNote
        this.stopNote = NativeModules.PianoSampler.stopNote
    }
}

export default new PianoSampler(NativeModules.PianoSampler)