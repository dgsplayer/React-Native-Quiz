import React from 'react';
import { View} from 'react-native';
import styles from './styles/HeaderInStyles';
import { Header } from 'react-native-elements';

class HeaderIn extends React.Component {

 constructor(props){
   super(props);
 }

  render() {
      return (
        <View>
          <Header
            centerComponent={{ text: '', style: styles.centerStyle  }}
            containerStyle={ styles.containerStyle}
          />
        </View>
      )
    }
  }

export default HeaderIn;
