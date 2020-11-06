/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, TouchableHighlightBase, View } from 'react-native';

import range from 'just-range';

import Key from './Key';

import MidiNumbers from './MidiNumbers';

class Piano extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteRange: {
        first: MidiNumbers.fromNote('f3'),
        last: MidiNumbers.fromNote('b5'),
      },
    };
  }

  componentDidMount() {
    const { noteRange } = this.props;
    this.setState({
      ...this.state,
      noteRange: {
        first: MidiNumbers.fromNote(noteRange.first),
        last: MidiNumbers.fromNote(noteRange.last),
      },
    });
  }

  shouldComponentUpdate(nextProps) {
    const { touchedKey, nextKey, noteRange } = this.props;

    return (
      touchedKey !== nextProps.touchedKey ||
      nextKey !== nextProps.nextKey ||
      noteRange.first !== nextProps.noteRange.first
    );
  }

  getNaturalKeyCount() {
    return this.getMidiNumbers().filter((number) => {
      const { isAccidental } = MidiNumbers.getAttributes(number);
      return !isAccidental;
    }).length;
  }

  getNaturalKeys() {
    return this.getMidiNumbers().filter((number) => {
      const { isAccidental } = MidiNumbers.getAttributes(number);
      return !isAccidental;
    });
  }

  getAccidentalKeys() {
    return this.getMidiNumbers().filter((number) => {
      const { isAccidental } = MidiNumbers.getAttributes(number);
      return isAccidental;
    });
  }

  getMidiNumbers() {
    const { noteRange } = this.state;
    return range(noteRange.first, noteRange.last + 1);
  }

  getNaturalKeyWidth() {
    return 1 / this.getNaturalKeyCount();
  }

  render() {
    const { touchedKey, nextKey, onPlayNoteInput, onStopNoteInput } = this.props;
    const { noteRange } = this.state;
    const naturalKeyWidth = this.getNaturalKeyWidth();
    return (
      <View style={styles.container}>
        {this.getMidiNumbers().map((midiNumber) => {
          const { isAccidental } = MidiNumbers.getAttributes(midiNumber);
          const isTouched = touchedKey.includes(midiNumber);
          const isNext = nextKey.includes(midiNumber);
          return (
            <Key
              naturalKeyWidth={naturalKeyWidth}
              midiNumber={midiNumber}
              noteRange={noteRange}
              accidental={isAccidental}
              onPlayNoteInput={onPlayNoteInput}
              onStopNoteInput={onStopNoteInput}
              useTouchEvents
              key={midiNumber}
              touch={isTouched}
              next={isNext}
            />
          );
        })}
      </View>
    );
  }
}

Piano.propTypes = {
  onPlayNoteInput: PropTypes.func.isRequired,
  onStopNoteInput: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    borderTopWidth: 1,
  },
});

export default Piano;
