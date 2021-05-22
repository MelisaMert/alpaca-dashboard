import { StyleSheet } from 'react-native'
import { makeStyles } from '@material-ui/core/styles';

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
      paddingTop: 10,
      fontSize: 16,
      fontWeight: 'bold'
   },
   accountCell: {
      flex: 1,
      flexDirection: 'row'
   },
   leftCell: {
      flex: 1,
   },
   rightCell: {
      flex: 1
   },
   label: {
      paddingTop: 10,
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
   symbol: {
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
      borderRadius: 5,
      backgroundColor: 'green'
   }
})


export const useStyles = makeStyles({
   root: {
      '&:hover': {
         backgroundColor: 'transparent',
      },
   },
   icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
         outline: '2px auto rgba(19,124,189,.6)',
         outlineOffset: 2,
      },
      'input:hover ~ &': {
         backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
         boxShadow: 'none',
         background: 'rgba(206,217,224,.5)',
      },
   },
   checkedIcon: {
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
         display: 'block',
         width: 16,
         height: 16,
         backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
         content: '""',
      },
      'input:hover ~ &': {
         backgroundColor: '#106ba3',
      },
   },
});

export const styleRadio = (props) => {
   const classes = useStyles();

   return (
      <Radio
         className={classes.root}
         disableRipple
         color="default"
         checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
         icon={<span className={classes.icon} />}
         {...props}
      />
   )
};
