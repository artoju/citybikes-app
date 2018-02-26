import axios from "axios";
import * as api from "../apikeys";
import urlMaker from "../urls/urlMaker"

export function fetchStations(id) {
    return function(dispatch, getState) {
        dispatch({type: "FETCH_STATIONS"});
        axios.get(urlMaker.stations(id))
        .then((response) => {
            var stations = response.data.network.stations;
            var locations;
            for (let i = 0; i < stations.length;i++) {
                locations = stations.map((location) => 
                ({name:location.name, 
                    long:location.longitude, 
                    lat:location.latitude, 
                    bikes:location.free_bikes, 
                    slots:location.empty_slots}));
            }
        dispatch({type: "FETCH_STATIONS_FULFILLED", payload: locations})})
        .catch((err) => {
            dispatch({type: "FETCH_STATIONS_REJECTED", payload: err})
        })
}}

export function fetchWeather(position) {
    return function(dispatch, getState) {
        dispatch({type: "FETCH_WEATHER"});
        axios.get(urlMaker.weather(api.WM_KEY, position))
        .then((response) => {
            const weather = {temp: response.data.main.temp, 
                icon: response.data.weather[0].icon,
                description: response.data.weather[0].main,
            country: response.data.sys.country,
            city: response.data.name}
            dispatch({type: "FETCH_WEATHER_FULFILLED", payload: weather})
        })
        .catch((err) => {
            dispatch({type: "FETCH_WEATHER_REJECTED"})
        })
    }
}

export function fetchNetworks() {
    return function(dispatch, getState) {
        dispatch({type: "FETCH_NETWORKS"});
        axios.get(urlMaker.networks())
        .then((response) => {
            const networks = response.data.networks.map(network => 
                    ({id: network.id, 
                    city: network.location.city, 
                    country: network.location.country,
                    lat: network.location.latitude,
                    lng: network.location.longitude}))
            dispatch({type: "FETCH_NETWORKS_FULFILLED", payload: networks})
        })
        .catch((err) => {
            dispatch({type: "FETCH_NETWORKS_REJECTED", payload: err})
        })
    }
}

export function saveMap(map, maps, directionsService, directionsRenderer) {
    return function(dispatch, getState) {
        dispatch({type: "SAVE_MAP", payload: {map: map, maps: maps, directionsService: directionsService, directionsRenderer: directionsRenderer}})
    }
}