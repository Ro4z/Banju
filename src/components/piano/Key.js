import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colors } from '@constants/color';
import MidiNumbers from './MidiNumbers';

function ratioToPercentage(ratio) {
  return `${ratio * 100}%`;
}

class Key extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touched: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { next, touch, noteRange } = this.props;
    const { touched } = this.state;
    return (
      next !== nextProps.next ||
      touch !== nextProps.touch ||
      noteRange !== nextProps.noteRange ||
      touched !== nextState.touched
    );
  }

  onPlayNoteInput = () => {
    this.setState({
      ...this.state,
      touched: true,
    });
    const { onPlayNoteInput, midiNumber } = this.props;
    onPlayNoteInput(MidiNumbers.midiToNoteName(midiNumber), midiNumber);
  };

  onStopNoteInput = () => {
    this.setState({
      ...this.state,
      touched: false,
    });

    const { onStopNoteInput, midiNumber } = this.props;

    onStopNoteInput(MidiNumbers.midiToNoteName(midiNumber), midiNumber);
  };

  // Key position is represented by the number of natural key widths from the left
  getAbsoluteKeyPosition(midiNumber) {
    const { pitchPositions } = this.props;
    const OCTAVE_WIDTH = 7;
    const { octave, pitchName } = MidiNumbers.getAttributes(midiNumber);
    const pitchPosition = pitchPositions[pitchName];
    const octavePosition = OCTAVE_WIDTH * octave;
    return pitchPosition + octavePosition;
  }

  getRelativeKeyPosition(midiNumber) {
    const { noteRange } = this.props;
    return this.getAbsoluteKeyPosition(midiNumber) - this.getAbsoluteKeyPosition(noteRange.first);
  }

  render() {
    const {
      naturalKeyWidth,
      accidentalWidthRatio,
      midiNumber,
      useTouchEvents,
      accidental,
      children,
      touch,
      next,
    } = this.props;

    const { touched } = this.state;

    return (
      <View
        style={[
          styles.ReactPiano__Key,
          accidental ? styles.ReactPiano__Key__accidental : styles.ReactPiano__Key__natural,
          {
            left: ratioToPercentage(this.getRelativeKeyPosition(midiNumber) * naturalKeyWidth),
            width: ratioToPercentage(
              accidental ? accidentalWidthRatio * naturalKeyWidth : naturalKeyWidth
            ),
          },
          next && styles.ReactPiano__Key__preview,
          touched && styles.ReactPiano__Key__active,
          touch && styles.ReactPiano__Key__active,
        ]}
        onTouchStart={useTouchEvents ? this.onPlayNoteInput : null}
        onTouchCancel={useTouchEvents ? this.onStopNoteInput : null}
        onTouchEnd={useTouchEvents ? this.onStopNoteInput : null}
      >
        <View style={styles.ReactPiano__NoteLabelContainer}>{children}</View>
      </View>
    );
  }
}

Key.propTypes = {
  midiNumber: PropTypes.number.isRequired,
  naturalKeyWidth: PropTypes.number.isRequired, // Width as a ratio between 0 and 1
  useTouchEvents: PropTypes.bool.isRequired,
  accidental: PropTypes.bool.isRequired,
  onPlayNoteInput: PropTypes.func.isRequired,
  onStopNoteInput: PropTypes.func.isRequired,
  accidentalWidthRatio: PropTypes.number,
  pitchPositions: PropTypes.object,
  children: PropTypes.node,
};

Key.defaultProps = {
  accidentalWidthRatio: 0.75,
  pitchPositions: {
    C: 0,
    Db: 0.55,
    D: 1,
    Eb: 1.8,
    E: 2,
    F: 3,
    Gb: 3.5,
    G: 4,
    Ab: 4.7,
    A: 5,
    Bb: 5.85,
    B: 6,
  },
};

const styles = EStyleSheet.create({
  ReactPiano__Key: {
    position: 'absolute',
    height: '100%',
  },
  ReactPiano__Key__natural: {
    backgroundColor: '#f6f5f3',
    borderColor: '#888',
    borderWidth: 0.7,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  ReactPiano__Key__accidental: {
    height: '70%',
    backgroundColor: '#000000',
    borderColor: 'transparent',
    borderWidth: 1,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 1,
  },
  ReactPiano__Key__active: {
    backgroundColor: colors.neon2,
  },
  ReactPiano__Key__preview: {
    backgroundColor: 'gray',
  },
  ReactPiano__NoteLabelContainer: {
    flex: 1,
    /* Align children .ReactPiano__NoteLabel to the bottom of the key */
    alignSelf: 'flex-end',
  },
});

export default Key;
