import en from './en.js';
import ru from "./ru.js";
import ua from "./ua.js";


let language = function (locale) {
    switch (locale) {
      case "en":
        return en;
      case "ru":
        return ru;
      case "ua":
        return ua;
      case "uk":
        return ua;
      default:
        return en;
    };
};

export default language;