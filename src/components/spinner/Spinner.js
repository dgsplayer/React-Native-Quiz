import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ActivityIndicator } from 'react-native'
import styles from './styles/SpinnerStyles';

export default class Spinner extends Component {
  static propTypes = {
    title : PropTypes.string,
    show : PropTypes.bool
  }

  render() {
   
      return (
        <View style = { styles.container }>
          <ActivityIndicator 
            size = "large"
            color = "white"/>
          <Text style = { styles.textStyle }>{ this.props.title }</Text>
        </View>
      )
    
  }
}