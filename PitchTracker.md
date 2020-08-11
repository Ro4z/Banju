# PitchTracker React Native

## How to Import

```javascript
import PitchTracker from '{path}/utils/engine/pitch_tracker'
```

## How to Use

### Functions

```javascript
PitchTracker.prepare() // Prepares pitchtracker engine
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

// response: {midiNum: (midi number of the note:int)}
```