import React, { Component } from 'react';
import { fetchWeather } from '../actions';
import  urlMaker from '../urls/urlMaker'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
 
class WeatherBox extends Component {
  constructor(props) {
      super(props);
      const { position } = this.props;
      this.state = {
        position: position,
      }
  }

  componentWillMount() {
    this.props.fetchWeather(this.state.position);
  }

  render() {
    const { weather } = this.props;
    return (
      <div className="weatherbox floater">
      { weather==null ? <div>Loading weather...</div> 
      : 
      <div>
        <h3>Weather in {weather.city}, {weather.country}</h3>
        <p id="temp">{weather.temp}&deg;C, {weather.description}</p>
        <img id="icon" src={urlMaker.icon(weather.icon)}/></div>  }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      weather: state.weather,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather: fetchWeather}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherBox); 