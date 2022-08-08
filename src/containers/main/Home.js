import * as React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Text } from "react-native";

import { Link } from "react-router-native";
import { Images } from '../../../Themes';
const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { playButtonPress } from '../../../Audios/audio';


export default class DetailScreen extends React.Component {
  state = {

    status: false,
    viewArray: null
  };

  ABox = async () => {

    // AsyncStorage.setItem('@levelFinal:key', '1');
    let levelFinal = await AsyncStorage.getItem('@levelFinal:key');
    if(!levelFinal){
      levelFinal = 1;
    }

    console.log('levelFinal',levelFinal);
    let viewArray = []
    let fases = 20;
    for (let index = 1; index <= fases; index++) {
      if(index > levelFinal)
        viewArray.push(
        <View style={styles.box} key={index}>
            <Image source={Images.cadeado} /><Text style={{ color: '#FFF' }}>{index}</Text>
        </View>
        )

      if(index == levelFinal)
        viewArray.push(
        <View style={styles.box} key={index}>
          <Link to={"/detalhe/"+index} style={styles.rowMain} component={TouchableOpacity} onPress={playButtonPress} >
            <Text style={styles.fontStrong}>{index}</Text>
          </Link>
        </View>
        )

      if(index < levelFinal)
        viewArray.push(
        <View style={styles.box} key={index}>
          <Link to={"/detalhe/"+index} style={styles.rowMain} component={TouchableOpacity} onPress={playButtonPress} >
            <Text style={styles.fontWeek}>{index}</Text>
          </Link>
        </View>
        )


    } 
    
    this.setState({viewArray: viewArray})
  }

  componentDidMount = async () => { 
    this.ABox();
  
  };
 

  render() {
 
    return (
      <View style={{ backgroundColor: '#000000', width: width, height: height }}>
        <View>
          <Text style={{ color: '#FFFFFF', fontSize: 24, textAlign: 'center', marginTop: 40 }}>QUIZ. Boa Sorte!</Text>
        </View>

        <View style={styles.container}>
          {this.state.viewArray}
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
   
  box: {
    flexBasis: 70,
    borderWidth: 1,
    // borderColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    margin: 10,
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