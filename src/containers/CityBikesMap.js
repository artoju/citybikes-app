import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import * as api from '../apikeys';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchStations, fetchWeather, saveMap } from '../actions';
import WeatherBox from '../components/WeatherBox';
 
 
class CityBikesMap extends Component {
  constructor(props) {
    super(props);
    const {lat, lng, city, country, id} = this.props.city;

    this.state = {
      position: {lat: lat, lng: lng},
      country: country,
      city: city,
      id: id, 
      selected: null,
      destination: '',
      markers: null
    }
  }

  componentWillMount() {
    this.props.fetchStations(this.state.id);
  }

  componentDidMount() {
    this.renderMarkers();
  }

  selectMarker = (position) => {
    this.setState({selected: position})    
  }

  renderMarkers = () => {
    const selectFunc = this.selectMarker;
    const { directionsRenderer, directionsService, map, maps } = this.props;
    const locations = this.props.stations;
    console.log(this.props);
  console.log(locations);
   //  directionsDisplay.setMap(map);
    var markers = locations.map((loc) => {
      var marker = new maps.Marker({
          position: {lat:loc.lat, lng:loc.long},
          map: map,
          title: 'Click to view bikes'
      });
      var infoPanel = '<div id="' + loc.name + '"><h3>' + loc.name + '</h3>' + '<p>' + 'Bikes: ' + loc.bikes + ' Slots: ' + loc.slots + '</p></div>';
      var infowindow = new maps.InfoWindow({
        content: infoPanel
        });
      marker.addListener('click', function() {
          infowindow.open(map, marker);
          selectFunc(loc.name);
        });
          return marker;
      });

  }
  initMap = (map, maps, selectFunc) => {
    const locations = this.props.stations;
    const directionsService = new maps.DirectionsService;
    const directionsRenderer = new maps.DirectionsRenderer;
    directionsRenderer.setMap(map);
    this.props.saveMap(map, maps, directionsService, directionsRenderer);    
/*      var markers = locations.map((loc) => {
      var marker = new maps.Marker({
          position: {lat:loc.lat, lng:loc.long},
          map: map,
          title: 'Click to view bikes'
      });
      var infoPanel = '<div id="' + loc.name + '"><h3>' + loc.name + '</h3>' + '<p>' + 'Bikes: ' + loc.bikes + ' Slots: ' + loc.slots + '</p></div>';
      var infowindow = new maps.InfoWindow({
        content: infoPanel
        });
      marker.addListener('click', function() {
          infowindow.open(map, marker);
          selectFunc(loc.name);
        });
          return marker;
      });
      this.setState({markers: markers})    */

  }

  calculateRoute = (destination) => {
    const { directionsRenderer, directionsService } = this.props;
    directionsService.route({
      origin: this.state.position,
      destination: destination,
      travelMode: 'BICYCLING'
    }, (response, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Setting directions failed.");
      }
    });
  }

  handleChange = (e) => {
    this.setState({destination: e.target.value});
  }

  handleClick = (e) => {
    const { destination } = this.state;
    this.setState({destination: ''});
    this.calculateRoute(destination);
  }

  render() {
    const position  = this.state.position;
    const selected  = this.state.selected;
    return (
      <div className="map-container">
      
      <GoogleMapReact
      bootstrapURLKeys={{
        key: api.GOOGLE_MAPS_KEY ,
      }}
        defaultCenter={position}
        defaultZoom={15}
        onGoogleApiLoaded={({map, maps}) => this.initMap(map, maps, this.selectMarker)}
        yesIWantToUseGoogleMapApiInternals
      />
      <WeatherBox position={position}/>
      <div className="directions-container floater">
      <div className="directions-content">
      <h3>Directions</h3>
      <p>{selected ? "Selected: " + selected : "Select a station"}</p>
      <input type="text" onChange={this.handleChange} value={this.state.destination} placeholder="Destination"/>
      <button onClick={this.handleClick}>Calculate</button>
      </div>
      </div>
       </div> 
    );
  }
}

function mapStateToProps(state) {
  return {
      stations: state.stations,
      map: state.map,
      maps: state.maps,
      directionsService: state.directionsService,
      directionsRenderer: state.directionsRenderer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStations: fetchStations, saveMap: saveMap}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CityBikesMap);
