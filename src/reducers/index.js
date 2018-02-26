export default function reducer(state={
    networks: [],
    stations: [],
    map: null,
    maps: null,
    directionsRenderer: null,
    directionsService: null,
    weather: null,
    loading: false,
    error: null,
}, action) {
    switch (action.type) {
        case "FETCH_NETWORKS": {
            return {...state, loading: true}
        }
        case "FETCH_NETWORKS_REJECTED": {
            return {...state, loading: false, error: action.payload}
        }
        case "FETCH_NETWORKS_FULFILLED": {
            return {...state, networks: action.payload, loading: false,}
        }
        case "FETCH_STATIONS": {
            return {...state, loading: true}
        }
        case "FETCH_STATIONS_REJECTED": {
            return {...state, loading: false, error: action.payload}
        }
        case "FETCH_STATIONS_FULFILLED": {
            return {...state, stations: action.payload}
        }
        case "FETCH_WEATHER": {
            return {...state, loading: true}
        }
        case "FETCH_WEATHER_REJECTED": {
            return {...state, error: action.payload, loading: false}
        }
        case "FETCH_WEATHER_FULFILLED": {
            return {...state, weather: action.payload, loading: false}
        }
        case "SAVE_MAP": {
            return {...state, map: action.payload.map, maps: action.payload.maps, directionsService: action.payload.directionsService, directionsRenderer: action.payload.directionsRenderer}
        }
        default: return state;
    }
}