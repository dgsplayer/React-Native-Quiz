import * as React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Image, Text } from "react-native";

import { NativeRouter, Route, Link } from "react-router-native";
import { Images, Metrics } from '../../../Themes';
const { width, height } = Dimensions.get('window');
import { useHistory } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { playButtonPress } from '../../../Audios/audio';

export default class DetailScreen extends React.Component {
  state = {

    level1: null,
    level2: null,
    level3: null,
    level4: null,
    level5: null,
    level6: null,
    level7: null,
    level8: null,
    level9: null,
    level10: null,
    level11: null,
    level12: null,
    status: false
  };

  componentDidMount = async () => {

    let level1 = await AsyncStorage.getItem('@level1:key');
    let level2 = await AsyncStorage.getItem('@level2:key');
    let level3 = await AsyncStorage.getItem('@level3:key');
    let level4 = await AsyncStorage.getItem('@level4:key');
    let level5 = await AsyncStorage.getItem('@level5:key');
    let level6 = await AsyncStorage.getItem('@level6:key');
    let level7 = await AsyncStorage.getItem('@level7:key');
    let level8 = await AsyncStorage.getItem('@level8:key');
    let level9 = await AsyncStorage.getItem('@level9:key');
    let level10 = await AsyncStorage.getItem('@level10:key');
    let level11 = await AsyncStorage.getItem('@level11:key');
    let level12 = await AsyncStorage.getItem('@level12:key');
    let levelAtual = await AsyncStorage.getItem('@levelAtual:key');
    let levelAnterior = await AsyncStorage.getItem('@levelAnterior:key');
    
    this.setState({
      level1: (!level2) ? '2' : '3',
      level2: (!level2) ? '1' : level2,
      level3: (!level3) ? '1' : level3,
      level4: (!level4) ? '1' : level4,
      level5: (!level5) ? '1' : level5,
      level6: (!level6) ? '1' : level6,
      level7: (!level7) ? '1' : level7,
      level8: (!level8) ? '1' : level8,
      level9: (!level9) ? '1' : level9,
      level10: (!level10) ? '1' : level10,
      level11: (!level11) ? '1' : level11,
      level12: (!level12) ? '1' : level12
    })

  };

  number(level, estado) {
    return (
      estado == '1' ?
        <Link style={styles.rowMain} component={TouchableOpacity} >
          <Image source={Images.cadeado} style={styles.imglevelStrong} /><Text style={{ color: '#FFF' }}>{level}</Text>
        </Link>
        : estado == '2' ?
          <Link to={"/detalhe/"+level} style={styles.rowMain} component={TouchableOpacity} onPress={playButtonPress} >
            <Text style={styles.fontStrong}>{level}</Text>
          </Link> :
          <Link to={"/detalhe/"+level} style={styles.rowMain} component={TouchableOpacity} onPress={playButtonPress} >
            <Text style={styles.fontWeek}>{level}</Text>
          </Link>
    );
  }

  render() {


    return (
      <View style={{ backgroundColor: '#000000', width: width, height: height }}>
        <View>
         
          <Text style={{ color: '#FFFFFF', fontSize: 24, textAlign: 'center', margin: 20 }}>Boa Sorte!</Text>
        </View>


        <View style={[styles.container]}>
          <View style={styles.item}>
            {this.state.level1 == '2' ?
              <Link to="/detalhe/1" style={styles.rowMain} component={TouchableOpacity} onPress={playButtonPress} >
                <Text style={{ color: '#FFFFFF', fontSize: 50, fontWeight: 'bold' }}>1</Text>
              </Link>
              :
              <Link to="/detalhe/1" style={styles.rowMain} component={TouchableOpacity} onPress={playButtonPress} >
                <Text style={styles.fontWeek}>1</Text>
              </Link>
            }
          </View>
          <View style={styles.item}>
            {this.number('2', this.state.level2)}
          </View>
          <View style={styles.item}>
            {this.number('3', this.state.level3)}
          </View>
        </View>

        <View style={[styles.container]}>
          <View style={styles.item}>
            {this.number('4', this.state.level4)}
          </View>
          <View style={styles.item}>
            {this.number('5', this.state.level5)}
          </View>
          <View style={styles.item}>
            {this.number('6', this.state.level6)}
          </View>
        </View>
        <View style={[styles.container]}>
          <View style={styles.item}>
            {this.number('7', this.state.level7)}
          </View>
          <View style={styles.item}>
            {this.number('8', this.state.level8)}
          </View>
          <View style={styles.item}>
            {this.number('9', this.state.level9)}
          </View>
        </View>
        <View style={[styles.container]}>
          <View style={styles.item}>
            {this.number('10', this.state.level10)}
          </View>
          <View style={styles.item}>
            {this.number('11', this.state.level11)}
          </View>
          <View style={styles.item}>
            {this.number('12', this.state.level12)}
          </View>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    width: '33%' // is 50% of container width
  },

  rowMain: {
    justifyContent: "center",
    alignItems: "center",
    width: '100%'
  },
  fontStrong: {
    color: '#FFFFFF',
    fontSize: 50,
    fontWeight: 'bold'
  },
  fontWeek: {
    color: '#333333',
    fontSize: 50,
    fontWeight: 'bold'
  },
  imglevelStrong: {
    // height: '80%' ,
    // backgroundColor: '#0000FF',

  },
  imglevelWeek: {
    // height: 30 ,
    // width: width * 0.1,
    // height: height * 0.15,
    opacity: 0.2,
    // backgroundColor: '#F00F0F'
  },

  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.10,
    // backgroundColor: '#F0FF0F'
  }
});
