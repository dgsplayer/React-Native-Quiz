/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import RootContainer from './src/RootContainer';
import { AdMobBanner } from 'react-native-admob';

export default class App extends Component<Props> {

  render() {

    return (
      <View style={{ flex: 1 }}>

        <ScrollView>
          <RootContainer></RootContainer>

        </ScrollView>
        <AdMobBanner
          adSize="fullBanner"
          // adUnitID="ca-app-pub-3940256099942544/6300978111" //teste
           adUnitID="ca-app-pub-9534097551670907/3227944781"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
        />
      </View>
    );
  }
}
