import React, { Component } from 'react';
import NetworkListItem from '../components/NetworkListItem';
import { bindActionCreators } from 'redux';
import { fetchNetworks } from '../actions';
import { connect } from 'react-redux';
 
 
class MapSelection extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        }
    }

    componentWillMount() {
        this.props.fetchNetworks();
    }

    handleChange = (e) => {
        this.setState({search: e.target.value})
    }

    searchNetwork = (network) => {
        let str = this.state.search.toLowerCase();
        return network.city.toLowerCase().includes(str) || network.country.toLowerCase().includes(str);
    } 
    
    render() {
        const { networks } = this.props;
        const searchedNetworks = networks.filter(network => this.searchNetwork(network));
        const networksList = searchedNetworks.map(network => 
        <NetworkListItem id={network.id} 
                        country={network.country} 
                        city={network.city}
                        lat={network.lat} 
                        lng={network.lng}
                        select={this.props.select} />)
    return (
        <div className="networks">
        <input onChange={this.handleChange} value={this.state.search} type="text" name="search" placeholder="e.g. helsinki fi"/>
        <ul>
            {networksList}
        </ul>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        networks: state.networks,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchNetworks: fetchNetworks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapSelection);