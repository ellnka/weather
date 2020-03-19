import template from './weather-control.mustache';
import './weather-control.scss';


export default class WeatherControl {
  constructor(language = "en") {
    this._render();

    this.$refresh_bg = this.$elem.querySelector(".refresh-bg");
    this.$languages = this.$elem.querySelector(".select-language");
    this.$degree = this.$elem.querySelector(".degree");
    this.$search = this.$elem.querySelector(".search-input");

    this.changeControlLang(language);
  }



  _render() {
    let tmp = document.createElement("div");
    tmp.innerHTML = template({});
    this.$elem = tmp.firstElementChild;
  }

  changeControlLang(language){
    this.$elem.querySelector(".search-input").placeholder = language.search_input;
    //this.$elem.querySelector(".search-button").innerHTML = language.search_button;
  }


  getElem() {
    return this.$elem;
  }

  getRefreshBGElem() {
    return this.$refresh_bg;
  }

  getDegreeElem() {
    return this.$degree;
  }

  getSearchInputElem() {
    return this.$search;
  }

  

  getLangElem() {
    return this.$languages;
  }
}
