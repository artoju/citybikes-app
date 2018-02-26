export default function reducer(state={
    networks: [],
    stations: [],
    map: null,
    maps: null,
    directionsRenderer: null,
    directionsService: null,
    weather: null,
    selected: null,
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
        case "SELECT_MAP": {
            return {...state, selected: action.payload}
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
/*         case "FETCH_SIGHTINGS": {
            return {...state, loading: true,}
        }
        case "FETCH_SIGHTINGS_FULFILLED": {
            return {...state, sightings: action.payload, loading: false,}
        }
        case "FETCH_SIGHTNGS_REJECTED": {
            return {...state, loading: false, error: action.payload}
        }
        case "ADD_SIGHTING": {
            return {...state, loading: true,}
        }
        case "ADD_SIGHTING_FULFILLED": {
            return {...state, sightings: [...state.sightings, action.payload], loading: false,}
        }
        case "ADD_SIGHTING_REJECTED": {
            return {...state, loading: false,}
        } */
        default: return state;
    }
}