import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import alpacaApi from '../services/alpaca';
import { dashboardStyle } from '../styles/style';

class DashboardScreen extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      buying_power: 0,
      cash: 0,
      long_market_value: 0,
      portfolio_value: 0,
      positions: [],
      quote: [],
      stockQuoteList: []
    }
  }

  getLastQuoteServiceRequest = (symbolArray) => {
     let requests = [];
     let lastquote = [];
     
     symbolArray.forEach((symbol) => {
        const symbolRes = fetch(`http://localhost:9000/alpacaDataAPI/getLastQuote/${symbol}`).then(res => res.json())
        requests.push(symbolRes);
     })
     return new Promise((resolve) => {
      Promise.all(requests)
        .then((quotes) =>
          quotes.forEach((q) => lastquote.push({
            symbol: q.symbol,
            price: q.last.askprice
          }))
        )
        .then(() => resolve(lastquote));
    });
  };  

  getSymbolArr = (positions) => {
    let symbolArray = [];
    positions.forEach((array) => {
      symbolArray.push(array.symbol);
    })
    return symbolArray;
  }

  getLastQuote(symbolArray) {
    this.getLastQuoteServiceRequest(symbolArray).then(data=> this.setState({stockQuoteList: data}))
  }

  getPositions = () => {
    return <View style={{ flex: 5, padding: 15 }}>
      <Text style={dashboardStyle.heading}>Positions</Text>
      <FlatList
        data={this.state.positions}
        renderItem={this.renderRow}
        keyExtractor={item => item.asset_id}
      />
    </View>
  }
 
  componentDidMount() {

    const api = alpacaApi();

    api.getPositions().then((response) => {
      if (response.ok) {
        this.setState({ positions: response.data });
        let symbolArray = this.getSymbolArr(response.data);
        this.getLastQuote(symbolArray);
      }
    })

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
  }

  renderRow = ({ item }) => {
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

  getMarketView = () => {
    if(this.state.stockQuoteList.length > 0) {
     return  <View style={{ flexDirection: 'row' }}>
          <View style={dashboardStyle.scoreboardItem}>
            <Text style={dashboardStyle.indexSymbol}>{this.state.stockQuoteList[0].symbol}</Text>
            <Ionicons name="caret-up-outline" size={25} color="white"></Ionicons>
            <Text style={dashboardStyle.indexPrice}>{this.state.stockQuoteList[0].price}</Text>
          </View>

          <View style={dashboardStyle.scoreboardItem}>
            <Text style={dashboardStyle.indexSymbol}>{this.state.stockQuoteList[1].symbol}</Text>
            <Ionicons name="caret-up-outline" size={25} color="white"></Ionicons>
            <Text style={dashboardStyle.indexPrice}>{this.state.stockQuoteList[1].price}</Text>
          </View>

          <View style={dashboardStyle.scoreboardItem}>
            <Text style={dashboardStyle.indexSymbol}>{this.state.stockQuoteList[2].symbol}</Text>
            <Ionicons name="caret-up-outline" size={25} color="white"></Ionicons>
            <Text style={dashboardStyle.indexPrice}>{this.state.stockQuoteList[2].price}</Text>
          </View>

          <View style={dashboardStyle.scoreboardItem}>
            <Text style={dashboardStyle.indexSymbol}>{this.state.stockQuoteList[3].symbol}</Text>
            <Ionicons name="caret-up-outline" size={25} color="white"></Ionicons>
            <Text style={dashboardStyle.indexPrice}>{this.state.stockQuoteList[3].price}</Text>
          </View>
      </View>
    }
  }

  getAccountView = () => {
    return <View style={dashboardStyle.account}>

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
  }

  render() {
    return <View style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>

      {this.getAccountView()}

      {this.getMarketView()}

      {this.getPositions()}

    </View>
  }
}

export default DashboardScreen



