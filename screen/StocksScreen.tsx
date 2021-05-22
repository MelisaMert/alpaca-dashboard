import * as React from 'react';
import { Text, View } from 'react-native';
import Plot from 'react-plotly.js';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { getStockAPI } from '../config';

class StocksScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      stockSymbol: "",
      stockChartXValues: [],
      stockChartYValues: []
    }
  }

  fetchStock = (stockSymbol) => {
    
    const pointerToThis = this;

    let stockSymbolVariable = "AMZN";

    let API_Call = getStockAPI(stockSymbolVariable);

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

  componentDidMount() {
    this.fetchStock(this.state.stockSymbol)
  }

  render() {
    return (
      <View >
        <Grid container>
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
              layout={{height: 600, title: 'A Fancy Plot'}}
            />
          </Grid>
        </Grid>
      </View>
    );
  }
}

export default StocksScreen



