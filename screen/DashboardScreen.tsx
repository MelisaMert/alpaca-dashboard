import * as React from 'react';
import { Text, View, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import alpacaApi from '../services/alpaca';
import polygonApi from '../services/polygon';
import { dashboardStyle } from '../styles/style';

class DashboardScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      buying_power: 0,
      cash: 0,
      long_market_value: 0,
      portfolio_value: 0,
      positions: []
    }
  }

  componentDidMount() {
    const api = alpacaApi();
    api.getAccount().then((response) => {
      if (response.ok) {
        this.setState({
          buying_power: response.data.buying_power,
          long_market_value: response.data.long_market_value,
          portfolio_value: response.data.portfolio_value,
          cash: response.data.cash
        })
      }
    })
 
    api.getPositions().then((response) => {
      if(response.ok){
        this.setState({
            positions:  response.data
        })
      }
    })
    const polygon = polygonApi();
    polygon.getQuote('SPY').then((response) =>  {
      console.log('polygon api')
      console.log(response);
    })
  }

  renderRow = ({item}) => {
      return (
      <View key={item.asset_id} style={dashboardStyle.position} >
          <View style={dashboardStyle.positionsLeftCell}>
              <Text style={dashboardStyle.symbol}>{item.symbol}</Text>
              <Text style={dashboardStyle.subheading}>{item.qty} @ {item.avg_entry_price}</Text>
          </View>
          <View style={dashboardStyle.positionsRightCell}>
              <Text style={dashboardStyle.price}>{item.current_price}</Text>
              <Text style={dashboardStyle.subheading}>
                  <Ionicons name="caret-up-outline" size={16} color="green"></Ionicons>
                {(item.change_today * 100).toFixed(2)}
              </Text>
          </View>
      </View>
      )
  }
  render() {
    return <View style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>

      <View style={dashboardStyle.account}>

        <Text style={dashboardStyle.heading}>Account</Text>

        <View style={dashboardStyle.accountCell}>

          <View style={dashboardStyle.leftCell}>
            <Text style={dashboardStyle.label}>Buying Power</Text>
            <Text>{this.state.buying_power}</Text>
            <Text style={dashboardStyle.label}>Long Market Value</Text>
            <Text>{this.state.long_market_value}</Text>
          </View>

          <View style={dashboardStyle.rightCell}>
            <Text style={dashboardStyle.label}>Portfolio Value</Text>
            <Text>{this.state.portfolio_value}</Text>
            <Text style={dashboardStyle.label}>Cash</Text>
            <Text>{this.state.cash}</Text>
          </View>
        </View>
      </View>

      
      <View style={{ flex: 3, padding: 15}}>
      <Text style={dashboardStyle.heading}>Market</Text>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={dashboardStyle.scoreboardItem}>
            <Text style={dashboardStyle.indexSymbol}>DIA</Text>
            <Ionicons name="caret-up-outline" size={25} color="white"></Ionicons>
            <Text style={dashboardStyle.indexPrice}>286.33</Text>
          </View>
          <View style={dashboardStyle.scoreboardItem}>
            <Text style={dashboardStyle.indexSymbol}>SPY</Text>
            <Ionicons name="caret-down-outline" size={25} color="white"></Ionicons>
            <Text style={dashboardStyle.indexPrice}>455.33</Text>
            </View>
          <View style={dashboardStyle.scoreboardItem}>
            <Text style={dashboardStyle.indexSymbol}>QQQ</Text>
            <Ionicons name="caret-up-outline" size={25} color="white"></Ionicons>
            <Text style={dashboardStyle.indexPrice}>333.33</Text>
          </View>
          <View style={dashboardStyle.scoreboardItem}>
            <Text style={dashboardStyle.indexSymbol}>IWM</Text>
            <Ionicons name="caret-down-outline" size={25} color="white"></Ionicons>
            <Text style={dashboardStyle.indexPrice}>454.55</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 5,padding: 15 }}>
      <Text style={dashboardStyle.heading}>Positions</Text>
        <FlatList 
          data={this.state.positions}
          renderItem = {this.renderRow}
          keyExtractor={item=> item.asset_id}
        
        />
      </View>
    </View>
  }
}

export default DashboardScreen



