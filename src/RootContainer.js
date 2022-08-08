import React, {Component} from 'react';
import { StyleSheet, View } from "react-native";
import { NativeRouter, Route } from "react-router-native";

import PerguntasScreen from "./containers/main/Perguntas"; 
import HomeScreen from "./containers/main/Home"; 

export default class RootContainer extends Component<Props> {

  render() {
    return (
      <NativeRouter>
      <View>
        <Route exact path="/" component={HomeScreen} />
        <Route path={'/detalhe/:id'} component={PerguntasScreen} />
      </View>
    </NativeRouter>
      )
  }
}

