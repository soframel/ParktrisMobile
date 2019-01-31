import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      alignItems: 'flex-start',

      padding: 20,
    },
    title:{
      fontSize: 24,
      alignItems: "center"
    },
    input:{
        alignSelf: 'stretch',
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1
    },
    oneLine:{
      flex: 1,
      flexDirection: 'row'
    },
  
    iconButton: {
      backgroundColor: 'purple'
    },
    button: {
      color: 'purple'
    }
  });