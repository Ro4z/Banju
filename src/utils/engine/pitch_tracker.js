import {NativeModules, NativeEventEmitter} from 'react-native';

class PitchTracker extends NativeEventEmitter {
    constructor(nativeModule) {
        super(nativeModule);
        nativeModule.prepare()
        this.start = nativeModule.start
        this.stop = nativeModule.stop
    }
}

export default new PitchTracker(NativeModules.PitchTracker)