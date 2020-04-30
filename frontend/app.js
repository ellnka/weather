"use strict";

import moment from "moment";
import GoogleMapsApi from "./api/googleMapsApi";

import style from "./styles/index.scss";
import language from "./lang/index.js";

import WeatherControl from "./weather-control";
import WeatherCard from "./weather-card";

import Config from "./config";
import Services from "./api/services";
import Helpers from "./api/helpers";

export default class WeatherApp {
  constructor(locale = "ru", degree = "c") {
    this.$elem = null;

    this.locale = locale;
    this.degree = degree;

    this.language = language(this.locale);

    this.location = {};
    this.weatherData = {};
    this.forecastData = {};

    this.weatherControl = new WeatherControl(this.language);
    this.weatherCard = new WeatherCard({});

    this.init();
    this._render(this.weatherControl, this.weatherCard);


  }


  init() {
    this.requestIpInfo();
    this.requestUnsplash("spring");
  }

  initGoogle() {
    this.gmapApi = new GoogleMapsApi(Config.google().api_key);
    this.gmapApi.load().then(() => {
      this.autocompleteSearch(this.weatherControl.getSearchInputElem());
      this.renderMap(this.weatherCard.getMapElem());
    });
  }

  requestIpInfo() {
    Services.getIpInfo(Config.ipinfo()).then(ipinfo => {
      this.location = {
        coord: Helpers.getLatLngFromLoc(ipinfo.loc)
      };
      this.requestWeather(this.location);
      this.requestWeatherForecast(this.location);
      this.initGoogle();
    });
  }



  requestWeather(location) {
    Services.getOpenWeatherMap(
      Config.openweathermap(),
      location.coord,
      this.locale
    ).then(weatherData => {
      this.setWeatherData(weatherData);
      this.weatherCard.updateWeather(this.weatherData, this.degree, this.language);
    });
  }

  setWeatherData(weatherData) {
    moment.locale(this.locale);

    this.weatherData = {
      location: weatherData.name,
      date: moment().format("llll"),
      temp: weatherData.main.temp,
      fills_like: weatherData.main.feels_like,
      wind_speed: weatherData.wind.speed,
      humidity: weatherData.main.humidity,
      description: weatherData.weather[0].description,
      main: weatherData.weather[0].main,
      icon: weatherData.weather[0].icon
    };
  }

  requestWeatherForecast(location) {
    Services.getOpenWeatherMapForecast(
      Config.openweathermap(),
      location.coord,
      this.locale
    ).then(weatherData => {
      this.setWeatherForecastData(weatherData.list);
      this.weatherCard.updateForecast(this.forecastData, this.degree, this.language);
    });
  }

  setWeatherForecastData(list) {
    this.forecastData = this.filterForecastDays(list);
    this.changeWeatherForecastLang();
  }

  filterForecastDays(list, days = 3, timeFrom = 12, timeTo = 14) {
    let endPeriod = new Date();
    endPeriod.setDate(endPeriod.getDate() + days);
    list = list.filter(
      (item) => {
        let dt = item.dt * 1000;
        let hours = (new Date(dt)).getHours();
        return dt <= endPeriod.getTime() && (hours >= timeFrom && hours <= timeTo);
      }
    );
    return list;
  }

  changeWeatherForecastLang() {
    moment.locale(this.locale);
    this.forecastData = this.forecastData.map(item => {
      item.dt_txt = moment(item.dt * 1000).format("dddd");
      return item;
    });
  }

  requestUnsplash(weatherDesc) {
    Services.getUnsplash(Config.unsplash(), weatherDesc).then(
      unsplashData => {
        this.bg_img_url = unsplashData.urls.regular;
        this.$elem.style.backgroundImage = `url("${this.bg_img_url}")`;
      }
    );
  }

  _render(weatherControl, weatherCard) {
    this.$elem = document.createElement("div");
    this.$elem.classList.add("weather-app");
    this.$elem.classList.add("container-fluid");

    this.$elem.appendChild(weatherControl.getElem());
    this.$elem.appendChild(weatherCard.getElem());

    weatherControl.getRefreshBGElem().addEventListener("click", this.clickRefreshBGHandler.bind(this));
    weatherControl.getDegreeElem().addEventListener("click", this.clickDegreeHandler.bind(this));
    weatherControl.getLangElem().addEventListener("change", this.changeLangHandler.bind(this));
  }

  clickRefreshBGHandler() {
    this.requestUnsplash();
  }

  clickDegreeHandler(event) {
    if (event.target.tagName.toLowerCase() !== 'button' || event.target.classList.contains("active")) {
      return;
    }

    this.degree = event.target.value;

    event.target.parentNode
      .querySelectorAll("button")
      .forEach((button) => {
        button.classList.toggle("active");
      });

    this.weatherCard.updateWeather(this.weatherData, this.degree, this.language);
    this.weatherCard.updateForecast(this.forecastData, this.degree, this.language);
  }


  changeLangHandler(event) {
    this.locale = event.target.value;
    this.language = language(this.locale);
    this.requestWeather(this.location);
    this.weatherControl.changeControlLang(this.language);

    this.changeWeatherForecastLang();
    this.weatherCard.updateForecast(this.forecastData, this.degree, this.language);
  }

  renderMap($map) {
    const options = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 8,
      center: {
        lat: parseFloat(this.location.coord.lat),
        lng: parseFloat(this.location.coord.lng)
      }
    };

    this.map = new google.maps.Map($map, options);
    //this.renderMarker(map, data);
  }

  renderMarker(map, data) {
    const icon = {
      // url: stylers.icons.red,
      scaledSize: new google.maps.Size(80, 80)
    };


    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.lat, data.lng),
      map: map,
      // icon: icon,
      //  title: data.title,
      animation: google.maps.Animation.DROP
    });

    const infowindow = new google.maps.InfoWindow();
    this.handleMarkerClick(map, marker, infowindow);
  }

  handleMarkerClick(map, marker, infowindow) {

    google.maps.event.addListener(marker, 'click', () => {
      infowindow.setContent(marker.content);
      infowindow.open(map, marker);
    });

    google.maps.event.addListener(map, 'click', (event) => {
      if (infowindow) {
        infowindow.close(map, infowindow);
      }
    });
  }


  autocompleteSearch($input) {
    const options = {
      types: ["(cities)"]
    };
    const map = new google.maps.places.Autocomplete($input, options);

    const searchBox = new google.maps.places.SearchBox($input);
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      console.log("places");
      console.log(places);
      if (places.length == 0) {
        return;
      }

      this.location = {
        coord: Helpers.getLatLngFromGooglePlace(places[0])
      };
      this.requestWeather(this.location);
      this.requestWeatherForecast(this.location);

      const center = new google.maps.LatLng(this.location.coord.lat, this.location.coord.lng);
      this.map.panTo(center);
    });
  }





}


let weatherApp = new WeatherApp();
document.body.appendChild(weatherApp.$elem);