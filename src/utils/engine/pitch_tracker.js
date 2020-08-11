import {NativeModules, NativeEventEmitter} from 'react-native';

class PitchTracker extends NativeEventEmitter {
    constructor(nativeModule) {
        super(nativeModule);

        this.printModel = nativeModule.printModel
        this.start = nativeModule.start
        this.stop = nativeModule.stop
        this.prepare = nativeModule.prepare
    }
}

export default new PitchTracker(NativeModules.PitchTracker)