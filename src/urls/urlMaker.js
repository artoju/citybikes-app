export const urlMaker = {
    networks: () => {
        return "https://api.citybik.es/v2/networks";
    },
    stations: (id) => {
        return "http://api.citybik.es/v2/networks/" + id;
    },

    weather: (key, pos) => {
        return 'http://api.openweathermap.org/data/2.5/weather?lat=' + pos.lat + '&lon=' + pos.lng + '&appid=' + key + '&units=metric'
    },

    icon: (icon) => {
        return 'http://openweathermap.org/img/w/' + icon + '.png';
    }
}
