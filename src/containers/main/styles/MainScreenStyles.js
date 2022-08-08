import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  
  container : {
    // flex: 1,
    marginBottom: 20,
    backgroundColor: "#fafafa",
  },

  list:{
    padding: 20
  },

  noticeContainer:{
    backgroundColor: '#FFF',
    borderWidth:  1,
    borderColor:  '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },

  noticeTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20
  },

  noticeDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24
  },

  noticeDate: {
    fontWeight: 'bold',
    marginTop: 5
  },

  noticeButton:{
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#6068B1',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  noticeButtonText:{
    fontSize: 16,
    color: '#6068B1',
    fontWeight: 'bold'
  }


  
});