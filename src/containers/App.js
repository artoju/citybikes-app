import React, { Component } from 'react';
import CityBikesMap from './CityBikesMap';
import logo from '../logo.svg';
import '../App.css';
import WeatherBox from '../components/WeatherBox';
import MapSelection from './MapSelection';


class App extends Component {
  state = {selected: null}



  selectCity = (city) => {
    this.setState({selected: city});
  }

  deSelectCity = () => {
    this.setState({selected: null});
  }

  render() {
    const { selected } = this.state;
    return (
      <div className="App">
      <p className="floater back-button" style={selected ? {display: "block"} : {display: "none"}} onClick={this.deSelectCity}> &lt;&lt; Back</p>
       { !selected ?  
      <div><h1>Citybikes</h1>       
       <MapSelection select={this.selectCity}/> 
       </div>
       : 
          <CityBikesMap deSelect={this.deSelectCity} city={selected}/>
       }
     </div>
    );
  }
}

export default App;


