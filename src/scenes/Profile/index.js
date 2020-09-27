import React, {useState} from 'react';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Entypo from '@assets/icon/Entypo';
import Ionicons from '@assets/icon/Ionicons';
import {BACKGROUND_COLOR, colors} from '@constants/color';
import {HEIGHT} from '@constants/dimensions';
import FavoriteList from '@components/profile/FavoriteList';
import UserGraph from '@components/profile/UserGraph';
import MyPlayScreen from './MyPlay';
import MyLibraryScreen from './MyLibrary';

const Tab = createMaterialTopTabNavigator();

const Header = ({navigation}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginTop: 10,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="ios-chevron-back"
          style={{color: colors.grey85Text2, fontSize: 24}}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: colors.grey85Text2,
          fontFamily: 'NanumSquareR',
          fontSize: 21,
        }}>
        프로필
      </Text>
      <Ionicons
        name="ios-settings"
        style={{color: colors.grey85Text2, fontSize: 24}}
      />
    </View>
  );
};

const Profile = ({navigation}) => {
  const [openMenu1, setOpenMenu1] = useState(true);

  const toggleMenu = () => {
    setOpenMenu1(!openMenu1);
  };
  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} />
      <View style={styles.bodyContainer}>
        {/* TODO: replace with image */}
        <View style={styles.profileImg} />
        <View
          style={{
            flexDirection: 'row',
            //justifyContent: 'center',
          }}>
          <Text style={styles.profileName}>김반반반주주주 </Text>
          <TouchableOpacity>
            <Entypo name="pencil" style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileEmail}>fortebanju@naver.com</Text>
      </View>
      <View style={styles.listContainer}>
        <Tab.Navigator
          tabBarOptions={{
            style: {
              backgroundColor: BACKGROUND_COLOR,
            },
            indicatorStyle: {backgroundColor: colors.neon2},
            activeTintColor: colors.grey85Text2,
          }}
          swipeEnabled={false}>
          <Tab.Screen name="Library" component={MyLibraryScreen} />
          <Tab.Screen name="MY Play" component={MyPlayScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Profile;

const styles = EStyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
  },
  bodyContainer: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
    paddingTop: 40,
  },
  listContainer: {
    width: '100%',
    height: '55%',
    borderTopWidth: 1,
    borderColor: 'rgba(120,120,120,0.5)',
  },
  profileImg: {
    width: '60rem',
    height: '60rem',
    borderRadius: '60rem',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  profileName: {
    fontFamily: 'NanumSquareEB',
    fontSize: 30,
    color: colors.white2,
    marginTop: '7rem',
    marginBottom: '4rem',
  },
  editIcon: {
    fontSize: 26,
    color: colors.dusk,
    position: 'absolute',
    marginTop: '7rem',
  },
  profileEmail: {
    fontFamily: 'OpenSauceSans-Regular',
    fontSize: 22,
    color: colors.neon2,
  },
  listHeader: {
    width: '100%',
    height: '16rem',
    flexDirection: 'row',
  },
  listHeaderMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //card view
  cardView: {
    backgroundColor: '#0d0d0d',
    width: '100%',
    height: HEIGHT / 2.4,
    paddingHorizontal: '10rem',
    paddingVertical: '7rem',
    marginBottom: '7rem',
  },
  cardViewTitleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '3rem',
  },
  cardViewListView: {
    flex: 4,
  },
  cardViewTitle: {
    fontFamily: 'OpenSauceSans-ExtraBold',
    fontSize: '9rem',
    color: colors.white2,
    marginRight: '3rem',
  },
  cardViewTitleSub: {
    fontFamily: 'NanumSquareR',
    fontSize: '6rem',
    color: colors.grey40Subtitle2,
  },
});
