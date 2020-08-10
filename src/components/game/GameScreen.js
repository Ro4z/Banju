import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {GameEngine, GameLoop} from 'react-native-game-engine';
import Youtube from 'react-native-youtube';
import {Button} from 'react-native-elements';
import * as Progress from 'react-native-progress';

//using in GameEngine
import {BlueNote, PinkNote} from './Note';
import {MoveFinger, Spawn, Move} from './systems';
import ChordTable from './ChordTable';
import ProgressBar from './ProgressBar';
import NoteLine from './NoteLine';
import MatchLine from './MatchLine';
import PianoPartView from '../piano/PianoPartView';
import PianoEntireView from '../piano/PianoEntireView';
//constant
import {HEIGHT, WIDTH} from '../../constants/dimensions';
import {RADIUS} from '../../constants/game/note';
import {TEST_CHORD as test} from '../../constants/game/chord_test';
//icon
import Entypo from '../../assets/icon/Entypo';
import EvilIcons from '../../assets/icon/EvilIcons';

export default class GameScreen extends PureComponent {
  constructor() {
    super();
    this.entity = {
      table: {
        position: [40, 250],
        renderer: <ChordTable />,
        chord: ['', test[0].note, test[1].note],
      },
      progressBar: {
        position: [380, 200],
        renderer: <ProgressBar />,
      },
    };
    this.state = {
      entity: this.entity,
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //처음부터 재생
  _play = () => {
    let noteNumber = 0;
    this.interval = setInterval(() => {
      this.entity[noteNumber] = {
        position: test[noteNumber].position,
        renderer: noteNumber % 2 ? <PinkNote /> : <BlueNote />,
        code: test[noteNumber].note,
      };
      noteNumber++;
      if (noteNumber === test.length) {
        this._stop();
      }
    }, 500);
  };

  //clear play interval
  _stop = () => {
    clearInterval(this.interval);
  };

  render() {
    return (
      <GameEngine
        style={styles.container}
        systems={[Move]} //-- We can add as many systems as needed
        entities={this.state.entity}>
        {/* TODO: header 부분을 component로 분리할 것. */}
        <View style={styles.header}>
          <Youtube
            videoId="sqljo295DkE" // The YouTube video ID
            play={false} // control playback of video with true/false
            fullscreen // control whether the video should play in fullscreen or inline
            loop // control whether the video should loop when ended
            onReady={(e) => this.setState({isReady: true})}
            onChangeState={(e) => this.setState({status: e.state})}
            onChangeQuality={(e) => this.setState({quality: e.quality})}
            onError={(e) => this.setState({error: e.error})}
            style={styles.youtube}
          />
          <View>
            <View style={{flexDirection: 'row'}}>
              <Entypo
                name="youtube"
                style={{
                  color: 'red',
                  fontSize: 30,
                  marginRight: 10,
                }}
              />
              <Text style={{fontSize: 23, marginRight: 200}}>
                너의 이름은 OST - 아무것도 아니야
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                marginBottom: 35,
              }}>
              <Button
                title="Play"
                buttonStyle={{width: 120}}
                icon={() => (
                  <Entypo
                    name="controller-play"
                    style={[styles.icon, {color: '#fff', fontSize: 40}]}
                  />
                )}
                onPress={this._play.bind()}
              />
              <Button
                title="Stop"
                buttonStyle={{
                  width: 120,
                  backgroundColor: 'red',
                  marginLeft: 15,
                }}
                icon={() => (
                  <Entypo
                    name="controller-stop"
                    style={[styles.icon, {color: '#fff', fontSize: 40}]}
                  />
                )}
                onPress={this._stop.bind()}
              />
              <Button
                title="Reload"
                buttonStyle={{
                  width: 120,
                  backgroundColor: '#00AA44',
                  marginLeft: 15,
                  marginRight: 100,
                }}
                icon={() => (
                  <EvilIcons
                    name="refresh"
                    style={[styles.icon, {color: '#fff', fontSize: 53}]}
                  />
                )}
              />
            </View>
          </View>
        </View>
        {/* end of header */}

        {/* TODO: 줄 위치 convention 정할 것. */}
        {/* <NoteLine yPos={HEIGHT / 2.0} />
        <NoteLine yPos={HEIGHT / 2.5} />
        <MatchLine xPos={WIDTH / 6} /> */}

        {/* middle of screen */}
        <View
          style={{
            flex: 2,
            justifyContent: 'flex-end',
            paddingLeft: 40,
            paddingRight: 40,
            paddingBottom: 5,
          }}>
          <PianoEntireView />
        </View>

        {/* start of footer */}
        {/* TODO: Footer를 Component 단위로 분리할 것 */}
        {/* TODO: 레이아웃 크기 조절할 것 */}
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            flexDirection: 'row',
            flex: 1,
            paddingLeft: 40,
            paddingRight: 40,
          }}>
          <PianoPartView />
          <View style={{flex: 0.7}}></View>
          <PianoPartView />
        </View>
        {/* end of footer */}
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    zIndex: -1,
  },
  header: {
    width: '100%',
    height: HEIGHT / 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 40,
  },
  youtube: {height: 180, width: 320, marginRight: 20},
});
