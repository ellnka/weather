export default class getOpenWeatherAPI {

    static fetch(url) {
        //url = "http://localhost:8080/";
        return fetch(url).then(response => response.json());
    }

    static update(url, payload) {
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    }

    static getIpInfo(config, ip) {
        let url = `https://${config.api_host}/?token=${config.token}&ip=${ip || ''}`;

        return Services.fetch(url);
    }

    static getOpenWeatherMap(config, coord, lang) {
        let url = `https://${config.api_host + config.api_path_weather}/?lat=${coord.lat}&lon=${coord.lng}&lang=${lang}&appid=${config.api_key}`;
        return Services.fetch(url);
    }

    static getOpenWeatherMapForecast(config, coord, lang) {
        let url = `https://${config.api_host + config.api_path_forecast}/?lat=${coord.lat}&lon=${coord.lng}&lang=${lang}&appid=${config.api_key}`;
        return Services.fetch(url);
    }

    static getUnsplash(config, query) {
        let url = `https://${config.api_host + config.api_path}/?client_id=${config.access_key}&orientation=landscape&query=weather,${query}`;
        return Services.fetch(url);
    }


}