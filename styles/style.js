import { StyleSheet } from 'react-native'

export const dashboardStyle = StyleSheet.create({
    account: {
       margin: 15,
       flex: 3, 
    },
    heading: {
       fontSize: 24,
       fontWeight: 'bold'
    },
    label: {
       paddingTop:10,
       fontSize: 16,
       fontWeight: 'bold'
    },
    accountCell: {
       flex:1,
       flexDirection: 'row'
    },
    leftCell: {
       flex: 1,
    },
    rightCell: {
       flex: 1
    },
    label: {
       paddingTop:10,
       fontSize: 18,
       fontWeight: 'bold'
    },
    position: {
       flex: 1,
       flexDirection: 'row',
       margin: 5,
       borderWidth: 1,
       padding: 5,
       borderRadius: 5
    },
    positionsLeftCell: {
      flex: 4
    },
    positionsRightCell: {
       flex: 1
    },
    symbol : {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black'
    },
    subheading: {
      color: '#808080' 
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'green'
   },
   indexSymbol: {
     fontSize: 22,
     color: 'white'
   },
   indexPrice: {
     fontSize: 16,
     color: 'white',
   },
   scoreboardItem: {
      flex: 1, 
      borderWidth: 1, 
      alignItems: 'center', 
      fontWeight: 'bold',
      margin: 5,
      borderRadius:5,
      backgroundColor: 'green'
   }
})