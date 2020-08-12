import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const Item1 = () => {
  return (
    <View style={styles.mainCard}>
      <View style={styles.imgView}>
        <Image
          source={require('../../assets/img/sample_cover1.png')}
          style={styles.img}
        />
      </View>
      <View style={styles.textView}>
        <View style={styles.textSubView1}>
          {/* TODO: 자동 줄 바꿈하는 Text Component 사용해야 함. */}
          <Text style={styles.text1}>
            아무것도 아니야 (Nandemonaiya) {'\n'}너의 이름은 (Kimi no na wa) OST
          </Text>
        </View>
        <View style={styles.textSubView2}>
          <Text style={styles.text2}>3 M Views | chords: A F G C</Text>
        </View>
      </View>
    </View>
  );
};

const Item2 = () => {
  return (
    <View style={styles.mainCard1}>
      <View style={styles.imgView}>
        <Image
          source={require('../../assets/img/sample_cover2.png')}
          style={styles.img}
        />
      </View>
      <View style={styles.textView}>
        <View style={styles.textSubView1}>
          {/* TODO: 자동 줄 바꿈하는 Text Component 사용해야 함. */}
          <Text style={styles.text1}>
            BTS (방탄소년단) - ON | Piano Cover by Pianella Piano
          </Text>
        </View>
        <View style={styles.textSubView2}>
          <Text style={styles.text2}>3 M Views | chords: A F G C</Text>
        </View>
      </View>
    </View>
  );
};

export {Item1, Item2};

const styles = StyleSheet.create({
  mainCard: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'rgba(128,128,128,0.3)',
    height: 120,
    // borderRadius: 22.5,
    // overflow: 'hidden',
  },
  mainCard1: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'rgba(128,128,128,0.05)',
    height: 120,
    // borderRadius: 22.5,
    // overflow: 'hidden',
  },
  imgView: {
    height: 120,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {flex: 1, marginLeft: 5},
  img: {height: 110, width: 130, borderRadius: 22.5},
  textSubView1: {flex: 2, justifyContent: 'center'},
  textSubView2: {flex: 1, justifyContent: 'flex-start'},
  text1: {
    fontSize: 18,
    color: 'rgb(235, 235, 245)',
  },
  text2: {
    fontSize: 20,
    color: 'rgba(128,128,128,0.9)',
  },
});
