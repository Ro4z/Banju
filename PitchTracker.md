# PitchTracker React Native

## How to Import

```javascript
import PitchTracker from '{path}/utils/engine/pitch_tracker'
```

## How to Use

First, you must load the `onsets_frames_wavinput_uni.tflite` model to xcode project.  
Add tflite file to project, and go to the project -> Build Phases -> Add the .tflite to 'Copy Bundle Resources' 

### Functions

```javascript
PitchTracker.start() // Starts pitchtracker engine
pitchTracker.stop() // Stops pitchtracker engine
```

### Event Subscription for getting keys

```javascript
PitchTracker.addListener(
    "keyDown",
    res => console.log("keyDown Event occured", res)
)
// keyDown Event occured {"midiNum": 60}
PitchTracker.addListener(
    "keyUp",
    res => console.log("keyUp Event occured", res)
)
// keyUp Event occured {"midiNum": 60}

// {midiNum: (midi number of the note:int)}
```