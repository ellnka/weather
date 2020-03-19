export default class Helpers {
    constructor() {}

    static getLatLngFromLoc(location) {
        if (!location || !location.includes(',')) return null;
        let lat = location.split(",")[0];
        let lng = location.split(",")[1];
 
        return {lat, lng};
    }

    static getLatLngFromGooglePlace(place) {
        if (!place.geometry || !place.geometry.location || !place.geometry.location.lat || !place.geometry.location.lng) return null;
        
        let lat = place.geometry.location.lat();
        let lng = place.geometry.location.lng();
 
        return {lat, lng};
    }

    static convertTemp(temp, degree){
        if (degree === "c") {
          temp = Helpers.convertKelvinToCelsius(temp);
        } else if (degree === "f") {
          temp = Helpers.convertKelvinToFahrenheit(temp);
        }

        return temp;
    }

    static convertKelvinToCelsius(k){
        return parseInt(k - 273) + "°";
    }

    static convertKelvinToFahrenheit(k){
        return parseInt((k - 273.15) * 9 / 5 + 32) + "°";
    }

    static getFormattedDate(locale, date){
        let options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
        return date.toLocaleDateString(locale, options);
    }
}

