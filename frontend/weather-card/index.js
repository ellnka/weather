import Config from "./../config";
import Helpers from "./../api/helpers";

import template from './weather-card.mustache';
import './weather-card.scss';


export default class WeatherCard {
    constructor() {
        this._render();

        this.$map = this.$elem.querySelector(".js-map");

        this.$location = this.$elem.querySelector(".location");
        this.$date = this.$elem.querySelector(".date");
        this.$temp = this.$elem.querySelector(".temperature");

        this.$weather_pic = this.$elem.querySelector(".weather-pic").querySelector("img");
        this.$data1 = this.$elem.querySelector(".weather_data_1");
        this.$data2 = this.$elem.querySelector(".weather_data_2");
        this.$data3 = this.$elem.querySelector(".weather_data_3");
        this.$data4 = this.$elem.querySelector(".weather_data_4");       
       
    }

    _render() {
        let tmp = document.createElement("div");
        tmp.innerHTML = template({});
        this.$elem = tmp.firstElementChild;
    }


    updateWeather(weather, degree, language) {
        this.$location.innerHTML = weather.location;
        this.$date.innerHTML = weather.date;

        this.$temp.innerHTML = Helpers.convertTemp(weather.temp, degree);
        this.$weather_pic.src = Config.weather_imgs().path + weather.icon + ".svg";
        this.$weather_pic.classList.remove("d-none");

        this.$data1.innerHTML = weather.description;
        this.$data2.innerHTML = `${language.fills_like}: ${Helpers.convertTemp(weather.fills_like, degree)}`;
        this.$data3.innerHTML = `${language.wind}: ${weather.wind_speed} ${language.ms}`;
        this.$data4.innerHTML = `${language.humidity}: ${weather.humidity}%`;        
    }

    updateForecast(forecast, degree, language) {
        let elementCount = Math.max(forecast.length, 3);
        for(let i = 1; i <= elementCount; i++) {

            let $day_day = this.$elem.querySelector(".day" + i + "_day");
            let $day_temp = this.$elem.querySelector(".day" + i + "_temp");
            let $day_pic = this.$elem.querySelector(".day" + i + "_pic");

            $day_day.innerHTML = forecast[i - 1].dt_txt;
            $day_temp.innerHTML = Helpers.convertTemp(forecast[i - 1].main.temp, degree);
            $day_pic.src = Config.weather_imgs().path + forecast[i - 1].weather[0].icon + ".svg";;
        }
    }

    getElem() {
        return this.$elem;
    }

    getMapElem() {
    return this.$map;
  }
 
}
