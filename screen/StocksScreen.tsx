import * as React from 'react';
import { Text, View } from 'react-native';
import Plot from 'react-plotly.js';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { getStockAPI } from '../config';

class StocksScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      stockSymbol: "AMZN",
      stockChartXValues: [],
      stockChartYValues: []
    }
  }

  fetchStock = () => {

    const pointerToThis = this;

    let API_Call = getStockAPI(this.state.stockSymbol);

    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data);

        for (var key in data['Time Series (Daily)']) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(data['Time Series (Daily)']
          [key][`1. open`]);

          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          })
        }
      })
  }

  onChangeStockSymbol = (e) => {
    this.setState({ stockSymbol: e.target.value });
  }

  getStockSymbolRadioGroup = () => {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Stock Symbol</FormLabel>
        <RadioGroup
          value={this.state.stockSymbol}
          row aria-label="position"
          name="position"
          onChange={this.onChangeStockSymbol}>
          <FormControlLabel value="AAPL" control={<Radio />} label="AAPL" />
          <FormControlLabel value="MSFT" control={<Radio />} label="MSFT" />
          <FormControlLabel value="AMZN" control={<Radio />} label="AMZN" />
          <FormControlLabel value="SBUX" control={<Radio />} label="SBUX" />
        </RadioGroup>
      </FormControl>
    )
  }

  static getDerivedStateFromProps(props, state) {
    let stockSymbol = "AAPL";
    if (stockSymbol !== state.stockSymbol) {
        stockSymbol = state.stockSymbol


      console.log('Stock Symbol', stockSymbol);
      let API_Call = getStockAPI(stockSymbol);

      let stockChartXValuesFunction = [];
      let stockChartYValuesFunction = [];

      fetch(API_Call)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          console.log(data);

          for (var key in data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(data['Time Series (Daily)']
            [key][`1. open`]);

            state.stockChartXValues = stockChartXValuesFunction;
            state.stockChartYValues = stockChartYValuesFunction
          }
        })
    }
  }


  componentDidMount() {
    console.log('componentDidMount Running')
    this.fetchStock();
  }

  render() {
    return (
      <View>
        <Grid container>
          <Grid item xs={12}>
            {this.getStockSymbolRadioGroup()}
          </Grid>
          <Grid item xs={12}>
            <Plot
              data={[
                {
                  x: this.state.stockChartXValues,
                  y: this.state.stockChartYValues,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: 'red' }
                },
              ]}
              layout={{ height: 600, title: 'A Fancy Plot' }}
            />
          </Grid>
        </Grid>
      </View >
    );
  }
}

export default StocksScreen



