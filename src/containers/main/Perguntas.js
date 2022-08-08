import * as React from "react";
import { ImageBackground, Text, View, StyleSheet, Dimensions, ScrollView, Image, BackHandler } from "react-native";

import RoundedButton from "../../components/RoundedButton";
const { width, height } = Dimensions.get('window');
import { Images } from '../../../Themes';
import ApiAuth from '../../api/ApiAuth';
import { AdMobInterstitial } from 'react-native-admob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header, Input } from 'react-native-elements';
import Produtos from "./Produtos";


export default class App extends React.Component {
  state = {
    value: null,
    key: 0,
    options: 0,
    qtde: 4,
    qtde_calculo: 5,
    certas: 0,
    certasCheck: [],
    certasCheckResposta: [],
    erradasCheck: [],
    erradas: 0,
    percent: 0,
    curTime: 0,
    clicado: false,
    levelAtual: null,
    player: '',
    topscore: '',
    topnome: '',
    // options: [],
    status: false
  };

  componentDidMount = () => {
    var _this = this;
    setInterval(() => {
   
      var curTime = _this.state.curTime;
      if(curTime < 3600 && _this.state.status == false)
        _this.setState({
          curTime : curTime + 1
        })
    }, 1000)

    this.listQuestions();
    this.getScore();
  };

  getScore = async () => {
    let levelAtual = this.props.match.params.id.toString();
    var _this = this;
    ApiAuth.create(this.state.access_token).listScore(levelAtual,'ok').then((response) => {
      if (response.data !== 'undefined' && response.data !== null) {
        
        _this.setState({ topscore: response.data[0].score, topnome: response.data[0].nome })
      }
    }).catch(function (error) {
      console.log(error)
    })
  }



  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  componentWillMount() {
    var _this = this;
    BackHandler.addEventListener('hardwareBackPress', function () {
      _this.props.history.push({ pathname: '/' });
      return true;
    });
  }


  getMovies() {
    AdMobInterstitial.setAdUnitID('ca-app-pub-9534097551670907/7219192773');
    // AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); //teste
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }

   shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  listQuestions = async () => {
    let levelAtual = this.props.match.params.id.toString();
    let levelAnterior = parseInt(this.props.match.params.id) - 1;
    
    let levelFinal = await AsyncStorage.getItem('@levelFinal:key');
    if(levelAtual > levelFinal)
      AsyncStorage.setItem('@levelFinal:key', levelAtual.toString());

    // this.loadUser();
    AsyncStorage.setItem('@levelAtual:key', levelAtual.toString());
    AsyncStorage.setItem('@levelAnterior:key', levelAnterior.toString());
    this.setState({ levelAtual: levelAtual.toString() })
    var _this = this;


    // shuffle(arr);
    _this.setState({ options: this.shuffle(Produtos[levelAtual]) })
    

    // ApiAuth.create(this.state.access_token).listCategories(levelAtual).then((response) => {
   
    //   if (response.data !== 'undefined' && response.data !== null) {
    //     _this.setState({ options: response.data })
    //   }
    // }).catch(function (error) {
    //   console.log(error)
    // })


  }

  congratulation = async () => {
    let levelAtual = this.props.match.params.id;
    let levelPosterior = parseInt(levelAtual) + 1;
    let level = await AsyncStorage.getItem('@level' + levelPosterior + ':key');
    var _this = this;

    if (!level) {
      // AsyncStorage.setItem('@level' + levelAtual.toString() + ':key', '3');
      // AsyncStorage.setItem('@level' + levelPosterior + ':key', '2');
    let levelFinal = await AsyncStorage.getItem('@levelFinal:key');
    if(levelPosterior > levelFinal)
      AsyncStorage.setItem('@levelFinal:key', levelPosterior.toString());
    }

    if(this.state.player){
      let levelAtual = this.props.match.params.id.toString();
      
      ApiAuth.create(this.state.access_token).listScoreSave(levelAtual,this.state.curTime,this.state.player).then((response) => {
        if (response.data !== 'undefined' && response.data !== null) {
          
          this.setState({ options : 0 });
          this.getMovies();
      
          setTimeout(function(){
            _this.setState({ curTime : 0 });
            _this.props.history.push({ pathname: '/' });
          }, 2000);
        }else{
          setTimeout(function(){
            _this.setState({ curTime : 0 });
            _this.props.history.push({ pathname: '/' });
          }, 2000);
        }
      }).catch(function (error) {
        console.log(error)
      })
    }else{
      this.setState({ options : 0 });
      this.getMovies();
  
      setTimeout(function(){
        _this.setState({ curTime : 0 });
        _this.props.history.push({ pathname: '/' });
      }, 2000)
    }

  
    

  };

  checkAnswer = value => {
     var _this = this;
    if (value === this.state.options[this.state.key].respostacerta) {
      let certasCheck = this.state.certasCheck;
      certasCheck.push(this.state.options[this.state.key].id);
      this.setState({ clicado: true, certasCheck: certasCheck, certasCheckResposta: certasCheckResposta, certas: this.state.certas + 1 });
    } else {
      let erradasCheck = this.state.erradasCheck;
      erradasCheck.push(this.state.key);
      this.setState({ clicado: true, erradasCheck: erradasCheck, erradas: this.state.erradas + 1 });
    }
    
    let certasCheckResposta = this.state.certasCheckResposta;
    certasCheckResposta.push(this.state.options[this.state.key].respostacerta);
    this.setState({ certasCheckResposta: certasCheckResposta});


          setTimeout(function() {
            if(_this.state.key < _this.state.qtde)
              _this.setState({ clicado: false, value: null, key: _this.state.key + 1 });
            else
              _this.setState({ clicado: false, status: true });
          }, 1500);

    
  };
 
  reset = async () => {
    var _this = this;

    this.getMovies();

    setTimeout(function(){
      _this.setState({ curTime : 0, clicado: false, key: 0, certas: 0, certasCheck: [], certasCheckResposta: [], erradasCheck: [], erradas: 0, status: false });
      _this.listQuestions();
    }, 2000)

    
  };

  render() {
    const { value } = this.state;
    const { key } = this.state;
    const { qtde } = this.state;
    const { status } = this.state;
    const { options } = this.state;

    if (options[key]) {

      if (status == false) {
        return (
          <View style={{ flex: 1 }}>
          <ImageBackground source={Images.back} style={styles.image}>
            <View style={styles.containerScore}>
              <View style={{width: '85%', marginLeft: 3}}><Text style={{color: '#FFF'}}>Recorde: {this.state.topnome}, Tempo: {this.state.topscore}s</Text></View>
              <View style={{width: '10%'}}><Text style={{color: '#ddd'}}>{this.state.curTime}s</Text></View>
            </View>
            <View>
              <Header
                centerComponent={{ text: 'LEVEL ' + this.state.levelAtual, style: styles.centerStyle }}
                containerStyle={styles.containerStyle}
              />
            </View>
            
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.textTopQuestion}>{key+1}/5</Text>
                <Text style={styles.textQuestion}>{options[key].pergunta}</Text>
              </View>
              <View style={styles.buttonsContainer}>

                {/* PERGUNTA 1 */}
                <View style={styles.buttonContainer}>
                    <RoundedButton
                    title={options[key].resposta1}
                    onPress={() => {
                      this.checkAnswer(options[key].resposta1)
                    }}
                    styles={!this.state.clicado ? styles.buttonStyle : this.state.certasCheckResposta.indexOf(options[key].resposta1) != -1 ? styles.buttonStyleRight : styles.buttonStyleWrong}
                  />
                </View>

                {/* PERGUNTA 2 */}
                <View style={styles.buttonContainer}>
                    <RoundedButton
                    title={options[key].resposta2}
                    onPress={() => {
                      this.checkAnswer(options[key].resposta2)
                    }}
                    styles={!this.state.clicado ? styles.buttonStyle : this.state.certasCheckResposta.indexOf(options[key].resposta2) != -1 ? styles.buttonStyleRight : styles.buttonStyleWrong}
                  />
                </View>

                {/* PERGUNTA 3 */}
                <View style={styles.buttonContainer}>
                    <RoundedButton
                    title={options[key].resposta3}
                    onPress={() => {
                      this.checkAnswer(options[key].resposta3)
                    }}
                    styles={!this.state.clicado ? styles.buttonStyle : this.state.certasCheckResposta.indexOf(options[key].resposta3) != -1 ? styles.buttonStyleRight : styles.buttonStyleWrong}
                  />
                </View>

                {/* PERGUNTA 4 */}
                <View style={styles.buttonContainer}>
                    <RoundedButton
                    title={options[key].resposta4}
                    onPress={() => {
                      this.checkAnswer(options[key].resposta4)
                    }}
                    styles={!this.state.clicado ? styles.buttonStyle : this.state.certasCheckResposta.indexOf(options[key].resposta4) != -1 ? styles.buttonStyleRight : styles.buttonStyleWrong}
                  />
                </View>

                {/* PERGUNTA 5 */}
                <View style={styles.buttonContainer}>
                    <RoundedButton
                    title={options[key].resposta5}
                    onPress={() => {
                      this.checkAnswer(options[key].resposta5)
                    }}
                    styles={!this.state.clicado ? styles.buttonStyle : this.state.certasCheckResposta.indexOf(options[key].resposta5) != -1 ? styles.buttonStyleRight : styles.buttonStyleWrong}
                  />
                </View>
              </View>

              {/* {key < qtde ? (
                <RoundedButton
                  title="Avançar"
                  onPress={() => {
                    this.checkAnswer(value);
                  }}
                  styles={styles.buttonStyle}
                />
              ) : (
                <RoundedButton
                  title="Finalizar"
                  onPress={() => {
                    this.finish(value);
                  }}
                  styles={styles.buttonStyleFinish}
                />
              )} */}
            </View>  
            </ImageBackground>
          </View>
        );
      } else {
        let percent;
        percent = (this.state.certas / this.state.qtde_calculo) * 100;
        // console.log(percent);
        return (
          <ScrollView   keyboardShouldPersistTaps='always'>
            <View style={styles.textContainerFinish}>
              {percent < 70 ?
                <Text style={styles.textQuestionBad}>QUE PENA. ACERTOU MENOS DE 70%. TENTE NOVAMENTE!</Text>
                :
                <View style={{width: width, justifyContent: 'center',
                      alignItems: 'center'}}>
                  <Image
                      source= {Images.happy}
                      style={{  backgroundColor: '#FFFFFF'}}
                      >    
                  </Image>
                  <Text style={styles.textQuestionSucess}>{"\n"}MANDOU BEM! ACERTOU MAIS DE 70%.</Text>
                </View>
              }

            {percent >= 70 && parseInt(this.state.curTime) < parseInt(this.state.topscore) ?
                <View style={{width: '100%'}}>
                  <Text style={styles.textQuestionBad}>UHUU NOVO RECORDE! {this.state.curTime}s</Text>
                  <Input

                    style={{width: '100%', color: 'blue'}}
                    maxLength={3}
                    placeholder="Insira seu apelido"
                    onChangeText={value => this.setState({ player: value })}
                    />
                </View>
                :
                null
              }

              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#6068B1",
                }}
              >
                {percent.toFixed(2)} %
            </Text>

              <Text style={{ fontSize: 18, fontWeight: "bold", color: "green" }}>
                Certas: {this.state.certas}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>
                Erradas: {this.state.erradas}
                {"\n"}
              </Text>
              {/* <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                RESPOSTAS ABAIXO
            </Text> */}
              {/* {options.map(item => {
                return (
                  <View style={{ marginBottom: 5 }} key={item.id}>
                    <Text>
                      {item.pergunta}{" "}
                      {this.state.certasCheck.indexOf(item.id) != -1 ?
                        <Text style={{ color: "green", fontWeight: 'bold' }}>
                          Resposta: {item.respostacerta}
                        </Text> : <Text style={{ color: "#ff0000", fontWeight: 'bold' }}>
                          Resposta: {item.respostacerta}
                        </Text>}
                    </Text>
                  </View>
                );
              })} */}

              {percent < 70 ?
                <RoundedButton
                  title="Recomeçar"
                  onPress={() => {
                    this.reset();
                  }}
                  styles={styles.buttonStyleFinish}
                />
                :
                <RoundedButton
                  title="Parabéns...Avançar"
                  onPress={() => {
                    this.congratulation();
                  }}
                  styles={styles.buttonStyleFinishSucess}
                />
              }


            </View>
          </ScrollView>
        );
      }
    } else {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center', backgroundColor: '#FFFFFF'}}>         
          <Image
            source= {Images.loading}
            style={{flex:1}} >    
          </Image>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: height
  },
  centerStyle: {
    fontSize: 17,
    color: '#fff'
  },
  containerStyle: {
    marginTop: 0,
    backgroundColor: '#000000',
    justifyContent: 'space-around',
    marginBottom: 5
  },
  textContainerFinish: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 12
  },
  buttonsContainer: {
    padding: 20
  },
  textTopQuestion: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  textQuestion: {
    fontSize: 19,
    color: "#FFFFFF",
    padding: 10
  },
  textQuestionSucess: {
    fontSize: 17,
    color: "green",
    fontWeight: "bold",
  },
  textQuestionBad: {
    fontSize: 17,
    color: "grey",
    fontWeight: "bold",
  },
  buttonStyleFinish: {
    width: "100%",
    height: 50,
    // marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#ffa500"
  },
  
  buttonStyleWrong: {
    backgroundColor: "red"
  },
  buttonStyleRight: {
    backgroundColor: "green"
  },

  buttonStyleFinishSucess: {
    width: "100%",
    height: 50,
    // marginTop: 10,
    borderRadius: 10,
    backgroundColor: "green"
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ACACAC",
    marginRight: 10
  },

  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#794F9B",
    marginLeft: 2,
    marginTop: 2
  },
  containers: {
    flex: 1,
    width: window.width,
    backgroundColor: "rgba(255, 255, 255, 1)",
    alignItems: "center",
    justifyContent: "center"
  },
  containerScore: {
    // flex: 1,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  }
});
