import api_config from './config.json';


export default class Config {

     static ipinfo() {
          return api_config.ipinfo;
     }

     static openweathermap() {
          return api_config.openweathermap;
     }

     static unsplash() {
          return api_config.unsplash;
     }

     static google() {
          return api_config.google;
     }

     static weather_imgs() {
          return api_config.weather_imgs;
     }

}