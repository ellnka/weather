export default class Map {
    static renderMap($map) {
        const options = {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 8,
            center: {
                lat: parseFloat(this.location.coord.lat),
                lng: parseFloat(this.location.coord.lng)
            }
        };

        const map = new google.maps.Map($map, options);
        //Map.renderMarker(map, data);
    }

    static renderMarker(map, data) {
        const icon = { // url: stylers.icons.red,
            scaledSize: new google.maps.Size(80, 80)
        };

        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(
                data.lat,
                data.lng
            ),
            map: map,
            // icon: icon,
            //  title: data.title,
            animation: google.maps.Animation.DROP
        });

        const infowindow = new google.maps.InfoWindow();
        Map.handleMarkerClick(map, marker, infowindow);
    }

    static handleMarkerClick(map, marker, infowindow) {
        google.maps.event.addListener(
            marker,
            "click",
            () => {
                infowindow.setContent(marker.content);
                infowindow.open(map, marker);
            }
        );

        google.maps.event.addListener(
            map,
            "click",
            event => {
                if (infowindow) {
                    infowindow.close(map, infowindow);
                }
            }
        );
    }

  
}