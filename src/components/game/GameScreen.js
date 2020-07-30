import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Youtube from 'react-native-youtube';

import {Finger} from './renderers';
import {MoveFinger, Spawn, Move} from './systems';
import NoteLine from './NoteLine';
import MatchLine from './MatchLine';
import {HEIGHT, WIDTH} from '../../constants/dimensions';

export default class GameScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      entity: {
        1: {position: [40, 200], renderer: <Finger />}, //-- Notice that each entity has a unique id (required)
        2: {position: [100, 200], renderer: <Finger />}, //-- and a map of components. Each entity has an optional
        3: {position: [160, 200], renderer: <Finger />}, //-- renderer component. If no renderer is supplied with the
        4: {position: [220, 200], renderer: <Finger />}, //-- entity - it won't get displayed.
        5: {position: [280, 200], renderer: <Finger />},
      },
    };
  }

  render() {
    return (
      <GameEngine
        style={styles.container}
        systems={[MoveFinger, Spawn, Move]} //-- We can add as many systems as needed
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
        </View>

        {/* TODO: 줄 위치 convention 정할 것. */}
        <NoteLine yPos={HEIGHT / 2.2} />
        <NoteLine yPos={HEIGHT / 3} />
        <MatchLine xPos={WIDTH / 6} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
  },
  youtube: {height: 180, width: 320, marginLeft: 20, marginTop: 20},
});
