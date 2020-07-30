import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Youtube from 'react-native-youtube';
import {Button} from 'react-native-elements';
import * as Progress from 'react-native-progress';

import {BlueNote, PinkNote} from './Note';
import {MoveFinger, Spawn, Move} from './systems';
import NoteLine from './NoteLine';
import MatchLine from './MatchLine';
import {HEIGHT, WIDTH} from '../../constants/dimensions';
import Entypo from '../../assets/icon/Entypo';
import EvilIcons from '../../assets/icon/EvilIcons';

export default class GameScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      entity: {
        1: {position: [WIDTH, HEIGHT / 2.2], renderer: <BlueNote />}, //-- Notice that each entity has a unique id (required)
        2: {
          position: [WIDTH + 200, HEIGHT / 3],
          renderer: <PinkNote color="blue" />,
        }, //-- and a map of components. Each entity has an optional
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
              <Text style={{fontSize: 23}}>
                너의 이름은 OST - 아무것도 아니야
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', marginTop: 30, marginBottom: 35}}>
              <Button
                title="Play"
                buttonStyle={{width: 120}}
                icon={() => (
                  <Entypo
                    name="controller-play"
                    style={[styles.icon, {color: '#fff', fontSize: 40}]}
                  />
                )}
              />
              <Button
                title="Play"
                buttonStyle={{
                  width: 120,
                  backgroundColor: '#00AA44',
                  marginLeft: 15,
                }}
                icon={() => (
                  <EvilIcons
                    name="refresh"
                    style={[styles.icon, {color: '#fff', fontSize: 53}]}
                  />
                )}
              />
            </View>
            <Progress.Bar
              progress={0.4}
              width={WIDTH - 390}
              height={15}
              color={'#00FF00'}
              unfilledColor={'rgba(128,128,128,0.5)'}
              borderColor={'white'}
            />
          </View>
        </View>
        {/* end of header */}

        {/* TODO: 줄 위치 convention 정할 것. */}
        <NoteLine yPos={HEIGHT / 2.2} />
        <NoteLine yPos={HEIGHT / 3} />
        <MatchLine xPos={WIDTH / 6} />

        {/* TODO: Footer를 Component 단위로 분리할 것 */}
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            height: HEIGHT / 2,
            position: 'absolute',
            top: HEIGHT - HEIGHT / 2,
          }}></View>
        {/* end of footer */}
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
    flexDirection: 'row',
    padding: 20,
  },
  youtube: {height: 180, width: 320, marginRight: 20},
});
